# TODOS

## P2 — Página de detalle por proyecto
- **Qué:** Vista de detalle por proyecto (galería, ficha técnica, proceso de obra).
- **Por qué:** Convierte el portfolio en herramienta de venta real; hoy los proyectos son cards sin profundidad.
- **Pros:** SEO por proyecto, material para enviar a prospectos.
- **Cons:** Sin fotos y documentación reales sería relleno.
- **Contexto:** Bloqueada por la sesión de fotos reales (ver lista de shots en PLAN.md Fase 5). Estructura de datos ya vive en `src/data/content.js`.
- **Esfuerzo:** M (humano) → S con CC. **Prioridad:** P2. **Bloqueada por:** fotos reales.

## P3 — Configurador interactivo de tablero
- **Qué:** Herramienta donde el visitante arma un tablero (módulos, térmicas, diferenciales) y pide cotización.
- **Por qué:** Convierte la pieza 3D central en generador de leads calificados; conecta con la idea Tableros Pro de Richard.
- **Pros:** Diferenciador fuerte, lead magnet, reutiliza el modelo 3D de la Fase 3.
- **Cons:** Proyecto en sí mismo (XL); requiere lógica de simulación seria para no ser juguete.
- **Contexto:** Nace del plan 3D 2026-07-11. El modelo procedural del tablero debe construirse con piezas parametrizables para no cerrar esta puerta.
- **Esfuerzo:** XL → L con CC. **Prioridad:** P3. **Depende de:** Fase 3 del plan 3D.

## P3 — Reinstalar Codex CLI
- **Qué:** `npm install -g @openai/codex` (binario nativo corrupto: ENOENT en codex-darwin-arm64).
- **Por qué:** Las revisiones de gstack pierden la voz cruzada de Codex; hoy degradan a subagent-only.
- **Esfuerzo:** S. **Prioridad:** P3.
