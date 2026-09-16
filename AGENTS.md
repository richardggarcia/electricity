# RG Electric - reglas para agentes

## Identidad del proyecto

- Carpeta canónica: `/Users/richardgarcia/dev_projects/landingelectri`
- Repositorio: `richardggarcia/electricity`
- Hosting: Cloudflare Workers, worker `landingelectri` (assets estáticos en `dist/` + `worker/index.js`)
- Dominio de producción: `https://rgelectric.bitsdeve.com` (custom domain del worker, atado desde el dashboard)
- URL de prueba: `https://landingelectri.poricobdicia.workers.dev` (mismo deploy)
- Media: bucket R2 `rgelectric-media`, público en `https://media.rgelectric.bitsdeve.com`
- DNS de `bitsdeve.com`: Cloudflare

## Despliegue

1. Trabajar únicamente desde la carpeta canónica.
2. `git status --short --branch` y no descartar cambios existentes.
3. `npm run build` y corregir cualquier error antes de desplegar.
4. `npm run deploy` (build + `wrangler deploy`). No hay CI: el deploy sale de esta máquina.

Secrets del formulario (ya cargados en el worker; `npx wrangler secret list` para ver los nombres):
`CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `RESEND_API_KEY`. Para desarrollo local van en `.dev.vars` (ignorado por git).

## Media (fotos y videos)

- Ningún video entra al repo ni a `public/`. Cloudflare Assets no responde Range requests: un
  mp4 servido desde ahí no se puede adelantar en el reproductor. R2 sí (206).
- Subir con `scripts/subir-trabajo.sh <carpeta> <slug>`: convierte, quita metadatos (las fotos del
  celular traen GPS) y sube a `trabajos/<slug>/` en R2. Las URLs se arman con `mediaUrl()` de `src/data/media.js`.
- El CDN cachea un año (`immutable`): para reemplazar un archivo, usar otro nombre.

## Cuidados

- No modificar otros workers, buckets, dominios ni registros DNS durante un despliegue de RG Electric.
- No publicar ubicación ni datos de clientes: ni en fotos (metadatos), ni en textos, ni en commits.
