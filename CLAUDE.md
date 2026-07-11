# Electricity — Landing de ingeniería eléctrica

Landing de RG Ingeniería Eléctrica (React 19 + Vite + Cloudflare Workers, form de contacto vía Resend). La experiencia combina narrativa fotográfica con scroll y un sistema modular industrial inspirado en interfaces editoriales contemporáneas. La marca visible es **RG**, acompañada siempre por el descriptor **Ingeniería Eléctrica**.

## Comandos

- `npm run dev` — worker (8787) + Vite en paralelo
- `npm run build` — build de producción
- `npm run deploy` — build + wrangler deploy

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
