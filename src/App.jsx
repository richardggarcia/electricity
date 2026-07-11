import {
  ArrowRight,
  ArrowUpRight,
  DraftingCompass,
  HardHat,
  ScanSearch,
  Zap
} from "lucide-react";
import { useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { ElectricalStory } from "./components/ElectricalStory";
import { MobileMenu } from "./components/MobileMenu";
import { Navbar } from "./components/Navbar";
import { Reveal } from "./components/Reveal";
import { accentColor, highlights, projects, services } from "./data/content";
import { useCinematicSections } from "./hooks/useCinematicSections";

const serviceIcons = [DraftingCompass, ScanSearch, HardHat];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useCinematicSections();

  return (
    <div className="page-shell" id="inicio">
      <div className="noise-overlay" />
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <header className="hero section-grid">
        <div className="hero-energy" aria-hidden="true">
          <svg viewBox="0 0 900 700" role="presentation">
            <defs>
              <linearGradient id="energy-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="0.42" stopColor="#ffffff" />
                <stop offset="0.72" stopColor="#d9ff3f" />
                <stop offset="1" stopColor="#d9ff3f" stopOpacity="0" />
              </linearGradient>
              <filter id="energy-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              className="hero-energy__glow"
              d="M35 560 C210 560 180 170 390 235 C545 285 540 565 815 165"
            />
            <path
              className="hero-energy__core"
              d="M35 560 C210 560 180 170 390 235 C545 285 540 565 815 165"
            />
          </svg>
        </div>
        <div className="hero-watermark">RG</div>
        <Reveal className="hero-copy">
          <div className="eyebrow-row">
            <span className="eyebrow-line" />
            <p className="eyebrow">RG - Ingenieria Electrica</p>
          </div>

          <h1>
            PROYECTAMOS
            <br />
            <span>LA ENERGIA</span>
          </h1>

          <div className="hero-bottom">
            <p>
              Ingenieria electrica aplicada a obra residencial y comercial:
              relevamiento, proyecto, ejecucion y documentacion tecnica.
            </p>

            <a href="#contacto" className="scroll-link">
              <span className="scroll-link__icon">
                <ArrowRight size={18} />
              </span>
              <span>Agenda una consulta</span>
            </a>
          </div>
        </Reveal>
      </header>

      <section className="marquee-band" aria-label="Especialidades">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="marquee-group" key={index}>
              <span>INGENIERIA ELECTRICA</span>
              <Zap size={20} style={{ color: accentColor }} />
              <span className="muted">RELEVAMIENTO TECNICO</span>
              <span>DOCUMENTACION DE OBRA</span>
              <Zap size={20} style={{ color: accentColor }} />
            </div>
          ))}
        </div>
      </section>

      <ElectricalStory />

      <main className="rg-modular">
        <section className="rg-manifesto" data-rg-section>
          <div className="rg-manifesto__heading" data-rg-intro>
            <p className="rg-label">Ingenieria aplicada / Buenos Aires</p>
            <h2>
              INGENIERIA
              <span>CON CRITERIO.</span>
            </h2>
          </div>

          <div className="rg-manifesto__grid">
            <article className="rg-module rg-module--statement" data-rg-item>
              <span className="rg-module__index">01 / ENFOQUE</span>
              <p>
                Proyectamos instalaciones que se entienden antes de ejecutarse:
                seguras, coordinadas y preparadas para durar.
              </p>
            </article>

            <article className="rg-module rg-module--monogram" data-rg-item>
              <span>RG</span>
              <div className="rg-pulse" aria-hidden="true" />
            </article>

            <article className="rg-module rg-module--detail" data-rg-item>
              <span className="rg-module__index">02 / METODO</span>
              <p>
                Relevamiento, calculo, documentacion y seguimiento tecnico
                conectados en un solo proceso.
              </p>
              <a href="#servicios" className="rg-arrow-link">
                Ver capacidades <ArrowRight size={18} />
              </a>
            </article>
          </div>
        </section>

        <section className="rg-services" id="servicios" data-rg-section>
          <div className="rg-section-heading" data-rg-intro>
            <p className="rg-label">Por que RG</p>
            <h2>TECNICA QUE<br />SOSTIENE LA OBRA.</h2>
          </div>

          <div className="rg-service-stack">
            {services.map((service, index) => {
              const ServiceIcon = serviceIcons[index];
              const symbolLabel = ["Proyecto", "Diagnostico", "Ejecucion"][index];

              return (
                <article
                  className={`rg-service-card rg-service-card--${index + 1}`}
                  data-rg-item
                  style={{ "--stack-index": index }}
                  key={service.number}
                >
                  <div className="rg-service-card__copy">
                    <span className="rg-card-number">{service.number}</span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="rg-service-card__symbol" aria-hidden="true">
                    <span>{service.number}</span>
                    <ServiceIcon strokeWidth={1.15} />
                    <small>{symbolLabel}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rg-projects" id="proyectos" data-rg-section>
          <div className="rg-section-heading rg-section-heading--projects" data-rg-intro>
            <p className="rg-label">Campos de intervencion</p>
            <h2>OBRAS<br />EN FOCO.</h2>
            <p>
              La experiencia real va a ocupar este espacio. Mientras organizamos
              el material, mostramos los tipos de intervencion que puede asumir RG.
            </p>
          </div>

          <div className="rg-project-grid">
            {projects.map((project, index) => (
              <article className={`rg-project rg-project--${index + 1}`} data-rg-item key={project.title}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="rg-project__veil" />
                <div className="rg-project__top">
                  <span>{project.year}</span>
                  <ArrowUpRight size={22} />
                </div>
                <div className="rg-project__copy">
                  <p>{project.location}</p>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rg-standards" data-rg-section>
          <div className="rg-standards__title" data-rg-intro>
            <span className="rg-chevron" aria-hidden="true">&gt;&gt;</span>
            <h2>RESPALDO TECNICO<br />EN CADA DECISION.</h2>
          </div>
          <div className="rg-standards__grid">
            {highlights.map((item, index) => (
              <article data-rg-item key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rg-contact" id="contacto" data-rg-section>
          <div className="rg-contact__intro" data-rg-intro>
            <p className="rg-label">Iniciar un proyecto</p>
            <h2>HABLEMOS<br />DE TU OBRA.</h2>
            <p>
              Contanos el alcance, la ubicacion y la etapa actual. La consulta
              llega directamente por correo para poder responder con contexto.
            </p>
          </div>
          <Reveal className="rg-contact__form">
            <ContactForm />
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <div>
          <div className="brand brand--footer">
            <strong>RG</strong><span>Ingenieria Electrica</span>
          </div>
          <p>
            Consultoria e ingenieria electrica
            <br />
            Buenos Aires, Argentina
          </p>
        </div>

        <div className="footer-meta">
          <div>
            <span>Contacto</span>
            <a href="#contacto">Enviar una consulta</a>
          </div>
          <div>
            <span>Ubicacion</span>
            <p>Palermo, CABA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
