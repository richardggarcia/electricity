---
name: trabajo
description: Cargar un trabajo nuevo (fotos y videos de una obra) a la página /trabajos/ de RG Electric. Usar cuando Richard diga "subí el trabajo", "cargá la obra", "tengo fotos de una obra", "nuevo trabajo" o invoque /trabajo.
---

# Cargar un trabajo nuevo en /trabajos/

Richard te va a dar una carpeta con fotos y videos del celular. Todo lo demás lo hacés vos.
Seguí los pasos en orden y no inventes datos.

## Pasos

1. **Pedir lo que falte**: la carpeta con los originales y un slug (minúsculas, números y guiones,
   ej. `tablero-palermo`). Listar la carpeta y decir qué se va a convertir y qué se salta.

2. **Convertir y subir**: `scripts/subir-trabajo.sh <carpeta> <slug>`.
   Convierte a formato web, borra metadatos (las fotos del celular traen GPS de la obra) y sube
   a R2 en `trabajos/<slug>/`. Al final imprime un bloque para el catálogo.
   Si falla, mostrar el error completo. No subir originales a mano ni ponerlos en `public/`.

3. **Proponer los textos**: mirar las fotos convertidas en `tmp/trabajos/<slug>/` con Read y
   escribir título (dos líneas, la segunda en acento), intro de dos oraciones, tags, y título +
   texto de cada etapa en el orden de los archivos. Tono y largo: copiar la entrada `victron` en
   `src/data/trabajos.js`. Sin nombre del cliente, dirección, barrio ni empresa, salvo que Richard
   lo pida explícitamente.

4. **Agregar al catálogo**: pegar el objeto en `src/data/trabajos.js` (primero si es el más
   reciente). Mostrarle los textos a Richard y corregir lo que diga.

5. **Verificar**: `npm run build`, después `npx wrangler dev --port <puerto libre>` (8787 y 8799
   suelen estar ocupados en este Mac) y abrir `/trabajos/` en el navegador: la card nueva aparece,
   "Ver trabajo" abre la galería, las imágenes vienen de `media.rgelectric.bitsdeve.com`, el video
   reproduce. Cerrar el wrangler dev al terminar.

6. **Commit** con mensaje descriptivo (qué obra, cuántas fotos/videos). Sin datos de clientes.

7. **Deploy**: pedirle a Richard que corra `npm run deploy`. Cuando termine, verificar
   `https://rgelectric.bitsdeve.com/trabajos/` (200, la card nueva, sin errores de consola).

## Reglas

- Videos y fotos de obra nunca al repo ni a `public/`: van a R2 (ver AGENTS.md, sección Media).
- No reusar un nombre de archivo con otro contenido: el CDN lo cachea un año.
- La card está pensada para video vertical (9:16). Si el video es horizontal, avisar a Richard
  antes de subirlo.
- Push a `main` solo si Richard lo pide.
