# Electricity — Landing BA Studio

Landing de estudio de ingeniería eléctrica (React 18 + Vite + Cloudflare Workers, form de contacto vía Resend). En transformación hacia experiencia inmersiva estilo Apple con 3D (React Three Fiber + GSAP ScrollTrigger).

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
