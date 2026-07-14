# RG Electric — Landing de instalaciones eléctricas

Web inmersiva para servicios de instalaciones eléctricas: narrativa fotográfica con GSAP, sistema modular en React y formulario conectado a Cloudflare Worker.

## Stack

- React + Vite
- Cloudflare Workers
- Resend API para envio de correos

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run deploy`

## Configuracion local

1. Copiar `.dev.vars.example` a `.dev.vars`
2. Completar las variables del proveedor de correo
3. Ejecutar `npm run dev`

## Variables necesarias

- `CONTACT_TO_EMAIL`: correo que recibira la consulta
- `CONTACT_FROM_EMAIL`: remitente verificado en Resend
- `RESEND_API_KEY`: API key del servicio de correo

## Despliegue

1. Autenticarse con `npx wrangler login`
2. Ejecutar `npm run deploy`

El sitio se construye con Vite y Cloudflare sirve los archivos estaticos desde `dist`, mientras el Worker atiende `/api/contact`.

## Estructura

- `src/`: frontend React
- `worker/index.js`: endpoint de contacto en Cloudflare Worker
- `wrangler.toml`: configuracion del Worker y assets
