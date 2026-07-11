<!-- /autoplan restore point: /Users/richardgarcia/.gstack/projects/richardggarcia-electricity/main-autoplan-restore-20260711-102710.md -->
# Plan: De landing editorial a experiencia 3D inmersiva

## Objetivo

Transformar la landing del estudio de ingeniería eléctrica de una página editorial estática a una experiencia inmersiva de scroll-storytelling con 3D de nivel premium, usando el tema eléctrico como narrativa visual.

> Marca actualizada (2026-07-11): **RG / Ingeniería Eléctrica**. RG funciona como monograma y el descriptor acompaña la marca en nav, footer, metadata y comunicaciones.

## Premisas

- P1: Una experiencia 3D memorable diferencia al estudio frente a landings genéricas de competidores y justifica tarifas premium ante arquitectos.
- P2: El tablero eléctrico es el "producto" del estudio: mostrarlo desarmado en 3D comunica rigor técnico mejor que fotos de stock.
- P3 (ajustada por Richard, 2026-07-11): el móvil recibe la experiencia 3D **completa**, no un fallback recortado. Esto convierte el presupuesto de performance móvil en requisito duro: DPR clamp agresivo, LOD en geometrías, bloom barato/selectivo, `frameloop` bajo demanda donde aplique. El fallback estático queda reservado solo para `prefers-reduced-motion` y navegadores sin WebGL.
- P4: Las imágenes reales llegarán después; se trabaja con referencias curadas del tema eléctrico como placeholders.

## Alcance

### Fase 1 — Fundaciones
- Dependencias: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `gsap` (ScrollTrigger), `lenis` (smooth scroll).
- Estructura: `src/three/` (escenas, materiales, hooks 3D), `src/sections/` (secciones de página), tokens de diseño centralizados.
- Smooth scroll global con Lenis integrado a ScrollTrigger.
- Mantener intactos: tipografía editorial, acento `#D9FF3F`, form de contacto (Worker + Resend), build Vite → Cloudflare.

### Fase 2 — Hero 3D "filamento de energía"
- Escena oscura con filamento/arco eléctrico (curva con shader emisivo + bloom via postprocessing).
- Parallax sutil con el mouse; entrada animada del titular sobre el canvas.
- Lazy load del canvas (dynamic import + Suspense); fallback estático (gradiente/imagen) solo para `prefers-reduced-motion` y WebGL no disponible. Móvil recibe el 3D completo con calidad adaptativa (DPR clamp, LOD, drei `PerformanceMonitor`).

### Fase 3 — Tablero eléctrico en vista explotada (pieza central)
- Modelo procedural del tablero con geometrías Three.js: gabinete, riel DIN, térmicas/breakers, barras de cobre, cableado peinado.
- Sección pineada con GSAP ScrollTrigger: al hacer scroll el tablero se desarma por capas.
- Anotaciones técnicas (HTML overlay con drei `<Html>`) ancladas a cada componente, apareciendo por etapa: normativa AEA 90364, selectividad, documentación.
- Reversa limpia al hacer scroll hacia arriba; fallback: secuencia de imágenes estáticas o layout simple.

### Fase 4 — Flujo de corriente entre secciones
- Líneas de luz (tubos con shader animado) que conectan visualmente servicios → proyectos → contacto.
- Partículas/electrones discretos; intensidad baja para no competir con el contenido.

### Fase 5 — Contenido y proyectos
- Curar imágenes de referencia del tema eléctrico (tableros abiertos, canalizaciones, detalles de instalación, espacios iluminados) reemplazando las genéricas de Unsplash.
- Lista de "shots" pendientes para las fotos reales de Richard.
- Textos revisados por sección para el nuevo ritmo narrativo.

### Fase 6 — Performance y accesibilidad
- Clamp de DPR, pausa de render fuera de viewport (`frameloop="demand"` donde aplique), un solo canvas compartido si es viable.
- `prefers-reduced-motion` respetado en GSAP y 3D; navegación por teclado y contraste intactos.
- Presupuesto: LCP < 2.5s en 4G, bundle 3D cargado en chunk separado.

### Fase 7 — QA y deploy
- QA en navegador (desktop + móvil), verificación del form de contacto end-to-end.
- Deploy a Cloudflare con `npm run deploy`.

## Expansiones aceptadas (cherry-pick /autoplan, 2026-07-11)
- Analítica ligera sin cookies (Cloudflare Web Analytics) para medir si la web genera consultas reales.
- Meta tags SEO/OG + favicon + tarjeta de social share (el sitio se compartirá por WhatsApp; la preview importa).
- Botón/enlace directo de WhatsApp además del form (canal de contacto dominante en LATAM).
- Preloader breve con animación de "carga eléctrica" (cubre el tiempo de carga del chunk 3D convirtiéndolo en parte de la narrativa).

## Fuera de alcance
- CMS o backend adicional (el contenido sigue en `src/data/content.js`).
- Fotos reales (llegan después; el diseño las contempla).
- Multi-idioma, blog, SEO avanzado más allá de meta tags básicos.
- Página de detalle por proyecto (diferido a TODOS.md — necesita fotos reales primero).
- Configurador interactivo de tablero (diferido a TODOS.md — conecta con la idea Tableros Pro, es un proyecto en sí mismo).
- Cloudflare Turnstile (rechazado en gate D8 — honeypot + WAF bastan).
- Sentry/error-tracking dedicado (diferido — `wrangler tail` + analítica cubren la etapa actual).

> Gate final resuelto (2026-07-11): plan APROBADO como está (D5). WebView de WhatsApp recibe 3D completo — decisión original de Richard sostenida frente al challenge del revisor; el spike Fase 0 lo prueba ahí con datos reales (D6). Marca actual: **RG / Ingeniería Eléctrica**. Sonido ambiental sutil ACEPTADO al alcance: hum eléctrico en interacciones clave, con toggle, apagado por defecto (D8).

## Ajustes de la revisión CEO (incorporados tras voz independiente)

Hallazgos del revisor independiente (Claude subagent; Codex no disponible en esta máquina) que se incorporan al plan:

1. **Fase 0 nueva — Spike con kill-gate (F4/F5):** antes de comprometer las 7 fases, 3-5 días construyendo solo el filamento del hero + un tablero explotado tosco. Prueba obligatoria en un Android de gama media **dentro del WebView de WhatsApp** (el primer toque real de un prospecto llega por ahí). Si no supera el listón visual/de fluidez, cambiar la Fase 3 a la alternativa de secuencia de imágenes pre-renderizada (técnica estándar de páginas de producto premium: Blender render → scrub de frames AVIF por scroll), que da calidad determinística en cualquier dispositivo.
2. **Quick wins como release independiente (F1):** WhatsApp button, OG tags, analítica y copy honesto en los proyectos (etiquetarlos como "tipo de obra" mientras sean referencias) se envían PRIMERO como release propio, sin esperar el 3D.
3. **Exactitud técnica como criterio de aceptación (F6):** el modelo del tablero debe pasar revisión de plausibilidad técnica por Richard (proporciones de térmicas, riel DIN, barras, peinado). Un tablero "de videojuego" socava el mensaje de rigor ante la audiencia técnica.
4. **P1 medible (F3):** tras el release de quick wins, medir baseline de consultas 2-4 semanas. Éxito de la experiencia 3D = subida sostenida de consultas calificadas a 90 días del launch.
5. **Presupuesto de tiempo por fase (F7):** cap duro — si la Fase 3 (tablero) supera 2 semanas de trabajo real, se envía hero-only y el tablero pasa a secuencia de imágenes.
6. **Anti-spam en `/api/contact` (hallazgo propio):** honeypot + time-trap en el form y validación en el worker (un bot puede quemar la cuota de Resend). Cloudflare Turnstile queda como decisión de gusto (agrega fricción).

## Revisión CEO — Outputs obligatorios (/autoplan Fase 1, 2026-07-11)

### Qué existe ya (reutilización)
| Sub-problema | Código existente | ¿Se reutiliza? |
|---|---|---|
| Form de contacto + envío email | `ContactForm.jsx` + `worker/index.js` (valida, escapa HTML, doble-submit protegido) | Sí, intacto; se le suma honeypot |
| Datos de contenido | `src/data/content.js` | Sí, se extiende (proyectos, servicios, anotaciones del tablero) |
| Reveal on scroll | `Reveal.jsx` + `useInView.js` (IntersectionObserver) | No — se reemplaza por GSAP para tener UN solo sistema de animación (DRY) |
| Tokens visuales | `styles.css` (acento #D9FF3F, tipografía editorial) | Sí, base del design system |
| Navbar/MobileMenu/marquee | componentes actuales | Sí, con retoques de motion |

### Arquitectura (nueva)
```
  index.html ── main.jsx ── App.jsx
                              │
        ┌─────────────────────┼──────────────────────┐
        │                     │                      │
   <SmoothScroll>        <Canvas fixed>          secciones HTML
   (Lenis + GSAP          (React Three Fiber,    (hero copy, servicios,
    ScrollTrigger,         un solo canvas         proyectos, valor,
    scrollerProxy)         detrás del HTML)       contacto=ContactForm)
        │                     │                      │
        │              src/three/                src/sections/
        │              ├─ EnergyFilament (shader+bloom)   │
        │              ├─ TableroExploded (procedural)    │
        │              ├─ CurrentFlow (tubos/partículas)  │
        │              └─ QualityManager (DPR/LOD/        │
        │                  PerformanceMonitor)            │
        └── progress 0-1 por sección ──▶ escenas leen el progreso
                                          (GSAP es el único dueño del scroll)
  Fallback: sin WebGL o prefers-reduced-motion ──▶ <HeroStatic> (imagen/gradiente)
  Worker CF: /api/contact (sin cambios de contrato) + assets estáticos
```
Regla anti-acoplamiento: las escenas 3D no conocen el DOM; reciben `progress` como prop/estado. GSAP no toca objetos three directamente salvo vía ese contrato.

### Error & Rescue Registry
| Codepath | Qué puede fallar | ¿Rescatado? | Acción | Usuario ve |
|---|---|---|---|---|
| `import('./three/Scene')` (chunk 3D) | red falla / chunk 404 tras deploy | SÍ (obligatorio) | catch → render fallback estático + log | página completa sin 3D, nada roto |
| Creación WebGL context | GPU/driver/WebView sin WebGL | SÍ | detección previa → fallback estático | ídem |
| `webglcontextlost` en sesión | GPU expulsa el contexto (móvil, tab background) | SÍ | listener → intento de restore; si falla, fallback | glitch breve o fallback |
| Carga de imágenes proyectos | 404 / red lenta | SÍ | skeleton + alt; `loading="lazy"` | placeholder elegante |
| `POST /api/contact` fetch | red caída | SÍ (existe) | catch → mensaje error | "Ocurrió un error al enviar" |
| Worker → Resend | 4xx/5xx de Resend, env vars faltantes | SÍ (existe) | 500 + `console.error("contact_error")` | "No se pudo enviar la consulta" |
| Spam bot a /api/contact | quema cuota Resend | GAP → se cierra | honeypot + time-trap (nuevo) | nada (transparente) |
| ScrollTrigger tras resize/rotación | medidas viejas → pin roto | SÍ (obligatorio) | `ScrollTrigger.refresh()` on resize/orientation | layout correcto |
| Deep-link `#contacto` con pin activo | scroll salta mal | SÍ | anclas calculadas post-refresh | navegación correcta |

### Edge cases de interacción
| Interacción | Edge case | Manejo |
|---|---|---|
| Scroll pineado (tablero) | usuario rota el teléfono a mitad | refresh + re-cálculo de pin |
| Scroll pineado | back button / anchor nav | ScrollTrigger anchors + `history.scrollRestoration` |
| Hero 3D | tab en background 10 min y vuelve | frameloop pausado fuera de viewport/visibilidad |
| Form | doble click submit | ya cubierto (`disabled={isSubmitting}`) |
| Form | submit con red intermitente | error visible + datos del form conservados (ya cubierto) |
| WhatsApp link | desktop sin WhatsApp | `wa.me` abre WhatsApp Web (ok) |
| Preloader | chunk carga en <300ms | no mostrar preloader (umbral mínimo, evita flash) |
| Preloader | chunk nunca carga | timeout 8s → fallback estático |

### Failure Modes Registry
| Codepath | Failure mode | Rescued | Test | Usuario ve | Logged |
|---|---|---|---|---|---|
| Chunk 3D | 404/red | Y | Y (unit del hook fallback) | fallback | console+analytics |
| WebGL init | no disponible | Y | Y | fallback | analytics event |
| Context lost | GPU evict | Y | manual | restore/fallback | console |
| /api/contact | Resend down | Y (existe) | Y (worker test) | mensaje error | worker log |
| /api/contact | spam | Y (nuevo) | Y | n/a | worker log |
| ScrollTrigger | resize | Y | manual/QA | ok | n/a |
→ 0 CRITICAL GAPS tras cierres propuestos.

### Dream state delta
```
HOY: landing editorial estática,      ESTE PLAN: experiencia 3D scroll-     12 MESES: plataforma visual del
proyectos fake de Unsplash,      ──▶  storytelling, tablero explotado,  ──▶ estudio: fotos reales, detalle por
sin medición, sin canal WhatsApp      quick-wins medibles, base R3F         proyecto, configurador de tablero
                                                                            (liga Tableros Pro), pipeline de leads
```
El plan mueve hacia el ideal; el activo no-comoditizable (fotos y documentación real) sigue siendo el cuello de botella — por eso los quick wins y la lista de shots van primero.

### NOT in scope (con razón)
Ver "Fuera de alcance" arriba; además: SSR/prerender (Vite SPA basta para una landing), tests E2E completos (smoke QA manual + /qa al final), Sentry (etapa temprana).

## Ajustes de la revisión Eng (/autoplan Fase 3)

1. **Versiones (F1):** actualizar a **React 19 primero** (app pequeña, riesgo bajo) y usar fiber v9 + drei v10 + postprocessing v3. Pines exactos en `package.json` (sin `^`), `package-lock.json` commiteado, `npm ci && npm audit` en el script de deploy (F14).
2. **Contrato de progreso (F3):** el scroll progress NO viaja como prop/estado React (re-render a 60-120Hz). Store transitorio (zustand con subscribe transitorio o módulo mutable): ScrollTrigger `onUpdate` escribe, las escenas leen en `useFrame`. Cero re-renders.
3. **Integración Lenis (F4):** `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t*1000))` + `lagSmoothing(0)`. NADA de scrollerProxy (patrón de Locomotive, causa doble-smoothing). `syncTouch: false` en móvil — la suavidad móvil viene de `scrub: 0.5+`.
4. **StrictMode (F5):** `useGSAP()`/`gsap.context()` con revert completo en cleanup + singleton de Lenis. Criterio de aceptación de Fase 1.
5. **Frameloop (F6):** `always` mientras el canvas está visible; pausa total en `visibilitychange`/fuera de vista. Sin modo demand.
6. **iOS Safari (F7):** `ScrollTrigger.config({ ignoreMobileResize: true })`, secciones pineadas en `svh`/`lvh`, refresh duro solo en `orientationchange` (debounced, restaurando posición).
7. **Tier inicial heurístico (F8):** el tier de calidad del hero se elige ANTES del primer frame (deviceMemory, hardwareConcurrency, GPU string, DPR); PerformanceMonitor solo ajusta desde ahí.
8. **Preloader (F9/F10):** progreso indeterminado (import() no expone progreso real). El H1/eyebrow/CTA renderizan como HTML plano inmediato — son el elemento LCP; el preloader/ignición cubre SOLO la capa del canvas, nunca el contenido.
9. **Context-lost (F11):** el rescue en sesión es imagen estática + layout normal (barato y honesto). La secuencia de imágenes es solo el resultado del kill-gate (reemplazo completo pre-renderizado), no un swap en runtime.
10. **Tablero: Blender → GLTF, no procedural (F16):** modelar una vez en Blender (Draco/meshopt, ~200-500KB), piezas nombradas, explosión animada por grupos mapeados a scroll. El código procedural de cableado peinado son semanas y es exactamente lo que el gate de exactitud técnica rechazaría. El mismo .blend alimenta la secuencia de imágenes si el spike falla — un asset, dos salidas. (Converge con hallazgo F6 del revisor CEO.)
11. **Disciplina de bundle (F17):** `manualChunks` para three-vendor en `vite.config.js`; todo lo que importe three/fiber/drei vive bajo `src/three/`; solo `React.lazy(() => import('./three/Scene'))` cruza la frontera. Verificación con rollup-plugin-visualizer = criterio de salida de Fase 1. GSAP+Lenis van en el chunk principal (~30KB gz).
12. **Worker hardening (F13):** límites de tamaño (name ≤200, email ≤254, phone ≤50, projectType ≤200, message ≤5000), check de Origin, strip de `\r\n` en `name` antes del subject, y regla de rate-limiting WAF de Cloudflare en `POST /api/contact` (la protección real de cuota; el honeypot es reducción de ruido).
13. **GSAP a prueba de fallos (F12):** estado inicial visible en CSS; los estados ocultos solo se setean dentro de `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`. Anotaciones tolerantes a datos faltantes. Self-host de las fuentes (hoy Google Fonts render-blocking en `styles.css:1`).
14. **Dark conversion como workstream propio (F18):** los 743 líneas de `styles.css` tienen valores claros más allá de los tokens; pase de contraste incluido (verificar texto oscuro sobre lima en tamaños pequeños).
15. **Fase 4 = primera en cortarse (F19):** los tubos de corriente pagan costo de fragment shader por píxeles 90% ocluidos tras superficies opacas. Si el cap de 2 semanas de Fase 3 peligra, Fase 4 se corta antes de degradar el tablero; una línea de gradiente CSS cumple el rol conectivo.

### Estrategia de tests (de cero)
- **Vitest (unit):** `worker/index.js` refactorizado para exportar `handleContact` + validadores (casos: campos faltantes, email inválido, honeypot lleno, time-trap, mensaje gigante, Resend 500, env vars faltantes); función pura de decisión de fallback/tier en `src/three/`; `ContactForm` con fetch mockeado (éxito limpia, error conserva datos).
- **Playwright (E2E, pre-deploy):** (1) carga → sin errores de consola → H1 visible ≤2.5s → submit del form con `/api/contact` interceptado → éxito; (2) `reducedMotion: 'reduce'` → fallback estático sin canvas; (3) abort del chunk three → página completamente usable (test de seguridad de deploy: HTML viejo + chunks nuevos tras redeploy).
- **QA manual:** feel del scroll, coreografía del pin, WebView de WhatsApp, rotación, context loss forzado.
- **/api/health extendido:** reporta presencia (booleana) de env vars para diagnóstico en 5 segundos.

### Paralelización (worktrees/lanes)
| Lane | Trabajo | Depende de |
|---|---|---|
| A | Release 1: quick wins (analytics, OG, WhatsApp, copy honesto) + worker hardening | marca definida |
| B | Fase 0 spike (filamento + tablero GLTF tosco + test WebView) | — |
| C | Dark conversion + migración Reveal→GSAP | — (comparte styles.css con A: coordinar) |
| D | Fases 2-3 (hero final + tablero) | B pasa el kill-gate, C |
Lanes A y B corren en paralelo. C puede solaparse con B. D espera el gate.

## Dirección de diseño (fixes de la revisión de diseño, /autoplan Fase 2)

1. **Conversión a sistema oscuro (crítico #1):** el token base actual es claro (`--bg: #f1f0e8`) y es físicamente incompatible con un canvas de energía detrás del HTML (secciones opacas claras lo taparían; transparentes matan el contraste). Decisión: **conversión dark completa** con set de tokens oscuro derivado del sistema editorial actual, y reglas de composición por sección: hero y tablero = "ventanas" al canvas; servicios/proyectos/contacto = superficies oscuras opacas con el flujo de corriente pasando por los bordes. Todo texto sobre 3D lleva scrim (gradiente) que garantice contraste ≥ 4.5:1. [Decisión de gusto — se ratifica en gate final.]
2. **Proyectos en lenguaje esquemático (crítico #2):** mientras no haya fotos reales, la sección proyectos NO usa fotos stock: se renderizan "tipos de obra" como isométricos esquemáticos / diagramas estilo unifilar en el mismo lenguaje visual 3D/línea. Honesto, consistente con el medio y más fuerte que Unsplash ante arquitectos. Las fotos reales las reemplazan cuando existan.
3. **Spec del hero (pantalla 1):** eyebrow ("Ingeniería eléctrica — Buenos Aires"), H1, una línea de propuesta de valor, CTA primario ("Agenda una consulta"), indicador de scroll. Coreografía: preloader → el filamento "enciende" desde el trazo del preloader (handoff continuo, no corte) → titular entra por líneas con stagger.
4. **Art-direction one-pager antes de Fase 2 (build):** paleta (superficies oscuras + cobre + roles del acento), escala tipográfica sobre canvas, storyboard de 6 cuadros del tablero (etapas, cámara, anotación por etapa), vocabulario de easing y duraciones, amplitud de parallax en px.
5. **Roles del acento `#D9FF3F`:** reservado para elementos interactivos (CTA, links, hover). La energía (filamento, partículas, bloom) usa núcleo más blanco con falloff hacia el acento — si todo brilla lima, el CTA deja de destacar.
6. **Guion del tablero (pieza central):** pin ≤ 400vh, 4 etapas mapeadas: (1) tablero cerrado + título, (2) puerta/frente se separa → "Normativa AEA 90364", (3) térmicas y barras se despliegan → "Selectividad y protecciones", (4) cableado peinado visible → "Documentación ejecutiva". Al liberar el pin: el tablero se rearma, la cámara retrocede y el flujo de corriente guía el ojo hacia proyectos (beat de descompresión). La sección "Valor técnico" actual se elimina — sus highlights viven en las anotaciones de las etapas (una sección = un trabajo).
7. **Marquee:** se rediseña como línea de corriente tipográfica (mismo lenguaje del CurrentFlow) o se elimina si no encuentra su lugar — no sobrevive como ticker editorial entre dos escenas cinematográficas.
8. **Estados de diseño faltantes:** preloader = trazo de circuito que se dibuja (progreso real del chunk), con handoff al filamento; fallback del tablero si el spike falla = secuencia de imágenes pre-renderizada (decidido, ya no "o layout simple"); `webglcontextlost` durante el pin = swap a la secuencia de imágenes conservando altura de sección (sin teletransporte de scroll); tiers de calidad definidos (alto: bloom+partículas / medio: bloom barato sin partículas / bajo: emisivo sin postprocesado) con degradación solo entre secciones, nunca a mitad de scroll visible; anotaciones `<Html>` en móvil = panel inferior fijo por etapa (no flotantes sobre el modelo); éxito del form = mensaje + oferta de seguir por WhatsApp; skeleton de imágenes = bloque con shimmer sutil en el color de superficie.
9. **Marca antes del Release 1:** el nombre definitivo se necesita para OG card, WhatsApp y preloader. Decisión del usuario en el gate final; Release 1 no sale sin marca definida.

<!-- AUTONOMOUS DECISION LOG -->
## Decision Audit Trail

| # | Phase | Decision | Classification | Principle | Rationale | Rejected |
|---|-------|----------|----------------|-----------|-----------|----------|
| 1 | Pre | cross_project_learnings=true | Mechanical | P6 | Dev solo, recomendado por defecto | — |
| 2 | CEO | Modo SELECTIVE EXPANSION | Mechanical | override /autoplan | Iteración sobre producto existente | — |
| 3 | CEO | Enfoque: R3F real-time (con kill-gate a img-sequence) | **Taste → gate** | P1 | Richard pidió Three.js explícito; spike Fase 0 valida; si falla el listón, secuencia de imágenes | híbrido puro |
| 4 | CEO | Analítica CF aceptada | Mechanical | P2 | blast radius, <1h, hace P1 medible | — |
| 5 | CEO | SEO/OG + favicon aceptado | Mechanical | P2 | blast radius, preview de WhatsApp | — |
| 6 | CEO | Botón WhatsApp aceptado | Mechanical | P2 | canal dominante LATAM, S | — |
| 7 | CEO | Preloader eléctrico aceptado | Mechanical | P2/P5 | cubre carga chunk; con umbral anti-flash | — |
| 8 | CEO | Theme toggle / i18n skipped | Mechanical | P4/P3 | diluye dirección de arte / prematuro | — |
| 9 | CEO | Detalle proyecto + configurador → TODOS.md | Mechanical | P3 | fuera de blast radius | — |
| 10 | CEO | Sonido ambiental | **Taste → gate** | — | puede elevar o ser gimmick | — |
| 11 | CEO | Reveal.jsx → GSAP (un solo sistema motion) | Mechanical | P4 | dos sistemas de animación = DRY violation | mantener ambos |
| 12 | CEO | Honeypot+time-trap anti-spam | Mechanical | P1 | cierra GAP de cuota Resend, sin fricción UX | — |
| 13 | CEO | Turnstile | **Taste → gate** | — | protege más pero agrega fricción/JS externo | — |
| 14 | CEO | Quick wins como release 1 independiente | Mechanical | P6 | valor hoy, desacopla del riesgo 3D (F1) | — |
| 15 | CEO | Fase 0 spike + kill-gate WebView WhatsApp | Mechanical | P1 | valida la premisa más riesgosa antes de 7 fases (F4/F5) | — |
| 16 | CEO | Exactitud técnica del tablero = criterio de aceptación | Mechanical | P1 | audiencia técnica detecta fantasía (F6) | — |
| 17 | CEO | Codex no disponible → subagent-only | Mechanical | degradación | binario codex corrupto (reinstalar: `npm i -g @openai/codex`) | — |
| 18 | Design | Conversión dark completa + reglas de composición | **Taste → gate** | P5/P1 | tokens claros incompatibles con canvas de energía; el concepto pide oscuro | mantener claro con canvas por sección |
| 19 | Design | Proyectos como isométricos esquemáticos (sin stock) | Mechanical | P5 | honestidad + consistencia de medio; stock rompe credibilidad post-tablero | mantener Unsplash |
| 20 | Design | Hero screen-1 spec completo | Mechanical | P1 | jerarquía sin especificar = la primera pantalla queda al azar | — |
| 21 | Design | Eliminar sección Valor (vive en anotaciones del tablero) | Mechanical | P5 | una sección = un trabajo; duplicaba contenido | mantener ambas |
| 22 | Design | Acento solo interactivo; energía = núcleo blanco | Mechanical | P5 | si todo brilla lima el CTA no destaca | — |
| 23 | Design | Guion del tablero: 4 etapas, pin ≤400vh | Mechanical | P1 | la pieza central no puede improvisarse en implementación | — |
| 24 | Design | Mockups interactivos del designer omitidos en pipeline auto | Mechanical | P3/P6 | el board de comparación requiere feedback interactivo (contradice modo auto); se ofrece /design-shotgun tras el gate | generarlos ahora |
| 25 | Design | Marca definitiva requerida antes de Release 1 | **User decision → gate** | — | OG card/WhatsApp/preloader la necesitan; solo Richard puede nombrar su estudio | — |
| 26 | Eng | React 19 + pines exactos (fiber9/drei10/pp3) | Mechanical | P5/P3 | fiber v9 peer-depende de React 19; app chica, riesgo bajo | pin stack v8 legacy |
| 27 | Eng | Progress vía store transitorio (no props) | Mechanical | P5 | props = re-render a 60-120Hz | props/estado |
| 28 | Eng | Lenis wiring nativo (sin scrollerProxy), syncTouch off | Mechanical | P1 | scrollerProxy causa doble-smoothing y pin drift | — |
| 29 | Eng | useGSAP + singleton Lenis (StrictMode-safe) | Mechanical | P1 | doble init en dev quema un día | — |
| 30 | Eng | frameloop always + pausa por visibilidad | Mechanical | P5 | demand no aplica en experiencia scroll-driven | demand |
| 31 | Eng | ignoreMobileResize + svh + refresh solo en orientation | Mechanical | P1 | resize del toolbar iOS teletransporta el pin | refresh naive |
| 32 | Eng | Tier inicial heurístico pre-primer-frame | Mechanical | P1 | PerformanceMonitor mide tarde para el hero | solo monitor |
| 33 | Eng | Preloader indeterminado; H1 = HTML plano (LCP) | Mechanical | P1 | import() sin progreso real; preloader ocluyendo H1 mata LCP | progreso "real" |
| 34 | Eng | Context-lost → imagen estática (secuencia solo si kill-gate) | Mechanical | P3 | la secuencia como rescue runtime es un proyecto, no un fallback | swap a secuencia |
| 35 | Eng | Tablero: Blender→GLTF (no procedural) | Mechanical | P3/P5 | procedural = semanas + falla gate de exactitud; converge con CEO F6 | procedural |
| 36 | Eng | manualChunks + frontera src/three/ | Mechanical | P1 | un import fuera de la frontera arrastra three al entry | — |
| 37 | Eng | Worker hardening + WAF rate rule | Mechanical | P1 | quota Resend; honeypot solo reduce ruido | solo honeypot |
| 38 | Eng | Dark conversion = workstream propio | Mechanical | P1 | 743 líneas con claro horneado; no es token swap | — |
| 39 | Eng | Fase 4 = primer corte si peligra el cap | Mechanical | P3 | menor valor narrativo por KB/frame; gradiente CSS suple | — |
| 40 | Eng | Stack de tests: Vitest (worker/fallback/form) + Playwright (3 specs) + QA manual | Mechanical | P1 | cubre las rupturas de 2am (redeploy chunk 404, Resend down) | — |

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 1 | ISSUES_OPEN (via /autoplan) | 9 proposals, 4 accepted, 2 deferred |
| Codex Review | `/codex review` | Independent 2nd opinion | 1 | SUBAGENT-ONLY (codex CLI roto) | outside voice: Claude subagent x3 |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | ISSUES_OPEN (via /autoplan) | 19 issues, 0 critical gaps |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | ISSUES_OPEN (via /autoplan) | score: 4/10 → 8/10, 9 decisions |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | SKIPPED | sin alcance developer-facing |

- **CROSS-MODEL:** Codex no disponible (binario corrupto); las tres voces externas fueron subagentes Claude independientes. Tema cross-fase de alta confianza: el tablero debe ser un asset real de Blender con exactitud técnica (CEO F6 + Eng F16, hallado independientemente).
- **VERDICT:** CEO + DESIGN + ENG CLEARED — plan APROBADO por Richard en el gate final de /autoplan (D5, 2026-07-11). Decisiones del gate: full 3D también en WebView (D6, dirección original sostenida), marca actual RG / Ingeniería Eléctrica, sonido ambiental aceptado / Turnstile rechazado (D8). Listo para implementar: Release 1 (quick wins) + Fase 0 (spike con kill-gate) en paralelo.

NO UNRESOLVED DECISIONS
