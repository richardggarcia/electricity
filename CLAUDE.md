# RG Electric — Landing de instalaciones eléctricas

Landing de RG Electric (React 19 + Vite + Cloudflare Workers, form de contacto vía Resend). La experiencia combina narrativa fotográfica con scroll y un sistema modular industrial inspirado en interfaces editoriales contemporáneas. La marca visible es **RG Electric** y el servicio se describe como **Instalaciones Eléctricas**.

## Comandos

- `npm run dev` — worker (8787) + Vite en paralelo
- `npm run build` — build de producción
- `npm run deploy` — build + wrangler deploy
- `scripts/subir-trabajo.sh <carpeta> <slug>` — convierte fotos/videos de una obra y los sube a R2

## Cargar un trabajo nuevo

**Invocar `/trabajo`** (skill del repo en `.claude/skills/trabajo/SKILL.md`): pide la carpeta y el
slug, corre `scripts/subir-trabajo.sh`, propone los textos, agrega la entrada a
`src/data/trabajos.js`, verifica en navegador y pide el deploy. Si Richard dice "subí el trabajo",
"tengo fotos de una obra" o similar, es eso.

Los archivos se sirven desde `https://media.rgelectric.bitsdeve.com/trabajos/<slug>/…` (R2).
Nunca poner videos en `public/`: ver AGENTS.md.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
- Subir fotos/videos de una obra nueva → invoke /trabajo
