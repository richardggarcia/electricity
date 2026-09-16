import {
  ArrowRight,
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
import { accentColor, services } from "./data/content";
import { useCinematicSections } from "./hooks/useCinematicSections";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

import { whatsappUrl } from "./data/contact";

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
              Instalaciones nuevas, reformas y armado de tableros para viviendas,
              locales y obras en CABA. También instalamos cableado de redes.
            </p>

            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="scroll-link">
              <span className="scroll-link__icon">
                <ArrowRight size={18} />
              </span>
              <span>Consultar por WhatsApp</span>
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
              <span>CABLEADO DE REDES</span>
              <Zap size={20} style={{ color: accentColor }} />
            </div>
          ))}
        </div>
      </section>

      <main className="rg-modular">
        <WorkVideo />

        <ServiceAreas />

        <section className="rg-services" id="servicios" data-rg-section>
          <div className="rg-section-heading" data-rg-intro>
            <p className="rg-label">Proceso</p>
            <h2>CÓMO LO<br />HACEMOS.</h2>
          </div>

          <div className="rg-service-stack">
            {services.map((service, index) => {
              const ServiceIcon = serviceIcons[index];
              const symbolLabel = ["Relevamiento", "Ejecución", "Pruebas"][index];

              return (
                <article
                  className={`rg-service-card rg-service-card--${index + 1}`}
                  data-rg-item
                  style={{ "--stack-index": index }}
                  key={service.number}
                >
                  <div className="rg-service-card__copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <div className="rg-service-card__symbol" aria-hidden="true">
                    <ServiceIcon strokeWidth={1.15} />
                    <small>{symbolLabel}</small>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <ElectricalStory />

        <section className="rg-contact" id="contacto" data-rg-section>
          <div className="rg-contact__intro" data-rg-intro>
            <p className="rg-label">Consultas</p>
            <h2>CONTANOS<br />QUÉ NECESITÁS.</h2>
            <p>
              Mandanos fotos, la ubicación y qué necesitás resolver por WhatsApp.
              Si preferís correo, completá el formulario.
            </p>
            <a className="button whatsapp-cta" href={whatsappUrl} target="_blank" rel="noreferrer">Consultar por WhatsApp <ArrowRight size={18} /></a>
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
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
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
