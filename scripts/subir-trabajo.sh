#!/usr/bin/env bash
# Convierte las fotos y videos de un trabajo a formato web y los sube a R2.
#
#   scripts/subir-trabajo.sh <carpeta-con-originales> <slug> [--solo-convertir]
#
# - Fotos (jpg/jpeg/png/heic): máximo 1600 px de lado, JPEG, sin metadatos (EXIF/GPS).
# - Videos (mov/mp4/m4v): H.264, máximo 1280 px de lado, 30 fps, sin audio,
#   faststart, sin metadatos. Se genera un poster <nombre>-poster.jpg.
# - Los convertidos quedan en tmp/trabajos/<slug>/ (ignorado por git) y suben a
#   R2 en trabajos/<slug>/. Al final imprime el bloque para src/data/trabajos.js.
#
# Nombres: se usa el nombre original en minúsculas (IMG_4968.MOV -> img-4968.mp4);
# si el archivo está en una subcarpeta, se antepone (01-inicio/foto.jpg ->
# 01-inicio-foto.jpg), salvo que ya empiece con el mismo número que la carpeta.
# Conviene renombrar los originales antes (montaje.MOV).
#
# El CDN cachea un año: si reemplazás un archivo, usale otro nombre.
set -euo pipefail

BUCKET="rgelectric-media"
MAX_IMG=1600
MAX_VIDEO=1280

usage() { sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'; exit 1; }

[ $# -ge 2 ] || usage
SRC="$1"; SLUG="$2"; SOLO_CONVERTIR="${3:-}"
[ -d "$SRC" ] || { echo "No existe la carpeta: $SRC" >&2; exit 1; }
[[ "$SLUG" =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]] || { echo "El slug va en minúsculas, números y guiones: $SLUG" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "Falta ffmpeg (brew install ffmpeg)" >&2; exit 1; }

cd "$(dirname "$0")/.."
OUT="tmp/trabajos/$SLUG"
mkdir -p "$OUT"

# 01-inicio/IMG_4968.MOV -> 01-inicio-img-4968; pero 01-inicio/01-replanteo.jpg -> 01-replanteo
# (si el archivo ya empieza con el mismo número que la carpeta, no se repite).
nombre_web() {
  local rel="$1" carpeta base
  rel="${rel%.*}"
  base="$(basename "$rel")"
  carpeta="$(dirname "$rel")"; [ "$carpeta" = "." ] && carpeta=""
  if [ -n "$carpeta" ] && [ "${carpeta%%-*}" = "${base%%-*}" ]; then carpeta=""; fi
  echo "${carpeta:+$carpeta/}$base" | tr '[:upper:]' '[:lower:]' | sed -E 's#/#-#g; s/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

# Escala manteniendo proporción: el lado mayor no supera $1.
escala() { echo "scale='if(gt(iw,ih),min($1,iw),-2)':'if(gt(iw,ih),-2,min($1,ih))'"; }

fotos=(); videos=()
while IFS= read -r f; do
  rel="${f#"$SRC"/}"
  ext="${f##*.}"; ext="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
  nombre="$(nombre_web "$rel")"
  case "$ext" in
    jpg|jpeg|png|heic|heif)
      dest="$OUT/$nombre.jpg"
      echo "foto   $rel -> $(basename "$dest")"
      if [ "$ext" = "heic" ] || [ "$ext" = "heif" ]; then
        tmp="$OUT/.tmp-$nombre.jpg"
        sips -s format jpeg -Z "$MAX_IMG" "$f" --out "$tmp" >/dev/null
        ffmpeg -nostdin -y -loglevel error -i "$tmp" -map_metadata -1 -q:v 3 "$dest"
        rm -f "$tmp"
      else
        ffmpeg -nostdin -y -loglevel error -i "$f" -vf "$(escala $MAX_IMG)" -map_metadata -1 -q:v 3 "$dest"
      fi
      fotos+=("$(basename "$dest")")
      ;;
    mov|mp4|m4v)
      dest="$OUT/$nombre.mp4"; poster="$OUT/$nombre-poster.jpg"
      echo "video  $rel -> $(basename "$dest") (+ poster)"
      trc="$(ffprobe -v error -select_streams v:0 -show_entries stream=color_transfer -of csv=p=0 "$f" || true)"
      case "$trc" in smpte2084|arib-std-b67)
        echo "   aviso: $rel es HDR; los colores pueden salir lavados. Grabá en SDR si podés." ;;
      esac
      ffmpeg -nostdin -y -loglevel error -i "$f" -vf "$(escala $MAX_VIDEO),format=yuv420p" -fpsmax 30 \
        -c:v libx264 -preset slow -crf 26 -an -movflags +faststart -map_metadata -1 "$dest"
      ffmpeg -nostdin -y -loglevel error -ss 1 -i "$dest" -frames:v 1 -q:v 3 "$poster"
      videos+=("$(basename "$dest")")
      ;;
    *) echo "salto  $rel (extensión .$ext)";;
  esac
done < <(find "$SRC" -type f ! -name '.*' | sort)

[ ${#fotos[@]} -gt 0 ] || [ ${#videos[@]} -gt 0 ] || { echo "No encontré fotos ni videos en $SRC" >&2; exit 1; }
echo; echo "Convertidos en $OUT:"; du -sh "$OUT"/* | sed 's/^/  /'

if [ "$SOLO_CONVERTIR" != "--solo-convertir" ]; then
  echo; echo "Subiendo a R2 ($BUCKET/trabajos/$SLUG/)..."
  for f in "$OUT"/*; do
    case "$f" in *.jpg) ct=image/jpeg;; *.mp4) ct=video/mp4;; *) continue;; esac
    npx wrangler r2 object put "$BUCKET/trabajos/$SLUG/$(basename "$f")" --file "$f" \
      --content-type "$ct" --cache-control "public, max-age=31536000, immutable" --remote 2>&1 \
      | grep -E "Upload complete|ERROR" | sed "s|^|  $(basename "$f"): |"
  done
fi

cat <<SNIPPET

Bloque para src/data/trabajos.js (completá título, textos y el orden de las etapas):

  {
    slug: "$SLUG",
    label: "Registro de obra / ...",
    title: ["PRIMERA LÍNEA", "SEGUNDA LÍNEA."],
    intro: "Qué se hizo, en dos oraciones.",
    tags: ["Tableros", "..."],
    cover: { image: "${fotos[0]:-${videos[0]%.mp4}-poster.jpg}", alt: "Descripción de la foto", caption: "Imágenes reales del montaje" },
    stages: [
$(for f in "${fotos[@]}"; do echo "      { image: \"$f\", title: \"Etapa\", text: \"Qué se ve en la foto.\" },"; done)
    ],
$(if [ ${#videos[@]} -gt 0 ]; then v="${videos[0]}"; cat <<V
    video: {
      file: "$v",
      poster: "${v%.mp4}-poster.jpg",
      label: "Recorrido de la instalación",
      title: ["El conjunto,", "en video."],
      text: "Qué muestra el video.",
      alt: "Descripción para lectores de pantalla"
    }
V
else echo "    video: null"; fi)
  }

Después: npm run deploy
SNIPPET
