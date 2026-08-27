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
import { ServiceAreas } from "./components/ServiceAreas";
import { WorkVideo } from "./components/WorkVideo";
import { accentColor, highlights, projects, services } from "./data/content";
import { useCinematicSections } from "./hooks/useCinematicSections";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

const serviceIcons = [DraftingCompass, ScanSearch, HardHat];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useSmoothScroll();
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
            <p className="eyebrow">RG Electric</p>
          </div>

          <h1>
            INSTALACIONES
            <br />
            <span>ELÉCTRICAS Y REDES</span>
          </h1>

          <div className="hero-bottom">
            <p>
              Instalaciones eléctricas y cableado de redes para viviendas,
              locales y obras en CABA. Relevamos, ejecutamos y te entregamos
              los planos.
            </p>

            <a href="#contacto" className="scroll-link">
              <span className="scroll-link__icon">
                <ArrowRight size={18} />
              </span>
              <span>Contanos qué necesitás</span>
            </a>
          </div>
        </Reveal>
      </header>

      <section className="marquee-band" aria-label="Especialidades">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="marquee-group" key={index}>
              <span>INSTALACIONES ELECTRICAS</span>
              <Zap size={20} style={{ color: accentColor }} />
              <span className="muted">ARMADO DE TABLEROS</span>
              <span>RELEVAMIENTOS Y MEDICIONES</span>
              <Zap size={20} style={{ color: accentColor }} />
            </div>
          ))}
        </div>
      </section>

      <ElectricalStory />

      <main className="rg-modular">
        <WorkVideo />

        <section className="rg-manifesto" data-rg-section>
          <div className="rg-manifesto__heading" data-rg-intro>
            <p className="rg-label">Cómo trabajamos / CABA</p>
            <h2>
              TODO QUEDA
              <span>DOCUMENTADO.</span>
            </h2>
          </div>

          <div className="rg-manifesto__grid">
            <article className="rg-module rg-module--statement" data-rg-item>
              <span className="rg-module__index">01 / RELEVAMIENTO</span>
              <p>
                Revisamos el lugar y lo que ya está instalado antes de definir
                materiales, tiempos y tareas.
              </p>
            </article>

            <article className="rg-module rg-module--monogram" data-rg-item>
              <span>RG</span>
              <div className="rg-pulse" aria-hidden="true" />
            </article>

            <article className="rg-module rg-module--detail" data-rg-item>
              <span className="rg-module__index">02 / EJECUCIÓN</span>
              <p>
                Ejecutamos, probamos y etiquetamos. Al terminar te entregamos
                los planos de lo que quedó hecho.
              </p>
              <a href="#rubros" className="rg-arrow-link">
                Ver rubros <ArrowRight size={18} />
              </a>
            </article>
          </div>
        </section>

        <ServiceAreas />

        <section className="rg-services" id="servicios" data-rg-section>
          <div className="rg-section-heading" data-rg-intro>
            <p className="rg-label">Proceso</p>
            <h2>CÓMO LO<br />HACEMOS.</h2>
          </div>

          <div className="rg-service-stack">
            {services.map((service, index) => {
              const ServiceIcon = serviceIcons[index];
              const symbolLabel = ["Relevamiento", "Ejecución", "Entrega"][index];

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
            <p className="rg-label">Residencial y comercial</p>
            <h2>TIPOS DE<br />TRABAJO.</h2>
            <p>
              Instalaciones nuevas, reformas, armado de tableros y adecuaciones
              sobre instalaciones existentes.
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
            <h2>ORDEN.<br />PROTECCIÓN.<br />PLANOS.</h2>
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
            <p className="rg-label">Consultas</p>
            <h2>CONTANOS<br />QUÉ NECESITÁS.</h2>
            <p>
              Decinos dónde es el trabajo, qué necesitás resolver y en qué etapa
              está la obra. Te respondemos por correo.
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
            <strong>RG</strong><span>Electric</span>
          </div>
          <p>
            Tableros e instalaciones eléctricas
            <br />
            Caballito, CABA
          </p>
        </div>

        <div className="footer-meta">
          <div>
            <span>Contacto</span>
            <a href="#contacto">Enviar una consulta</a>
          </div>
          <div>
            <span>Ubicación</span>
            <p>Caballito, CABA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
