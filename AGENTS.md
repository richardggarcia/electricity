# RG Electric - reglas para agentes

## Identidad del proyecto

- Carpeta canonica: `/Users/richardgarcia/dev_projects/landingelectri`
- Repositorio: `richardggarcia/electricity`
- Proyecto Vercel: `rgelectric`
- Dominio de produccion: `https://rgelectric.bitsdeve.com`
- Cuenta Vercel: `richardggarcia`
- Equipo Vercel: `team_hkvmTD03Su7QfvCb0Yw02h78`

## Despliegue seguro

1. Trabajar unicamente desde la carpeta canonica.
2. Ejecutar `git status --short --branch` y no descartar cambios existentes.
3. Ejecutar `npm run build` y corregir cualquier error antes de desplegar.
4. Verificar que `.vercel/project.json` indique `projectName: rgelectric` y el equipo esperado.
5. Desplegar con:

```bash
/Users/richardgarcia/dev_projects/general/scripts/vercel-safe-deploy.sh \
  /Users/richardgarcia/dev_projects/landingelectri \
  rgelectric
```

No ejecutar `vercel --prod` desde otra carpeta y no volver a enlazar el proyecto con otro nombre.

## Produccion

- Vercel sirve el frontend Vite y la funcion `api/contact.js`.
- La funcion necesita `FROM_EMAIL`, `TO_EMAIL` y `RESEND_API_KEY` en Vercel.
- El DNS de `rgelectric.bitsdeve.com` se administra en Cloudflare.
- No modificar otros proyectos, dominios o registros DNS durante un despliegue de RG Electric.
