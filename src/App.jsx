import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Shield,
  Zap
} from "lucide-react";
import { useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { MobileMenu } from "./components/MobileMenu";
import { Navbar } from "./components/Navbar";
import { Reveal } from "./components/Reveal";
import { accentColor, highlights, projects, services } from "./data/content";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="page-shell" id="inicio">
      <div className="noise-overlay" />
      <Navbar onOpenMenu={() => setIsMenuOpen(true)} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <header className="hero section-grid">
        <div className="hero-watermark">ENERGY</div>
        <Reveal className="hero-copy">
          <div className="eyebrow-row">
            <span className="eyebrow-line" />
            <p className="eyebrow">Buenos Aires - Engineering</p>
          </div>

          <h1>
            PROYECTAMOS
            <br />
            <span>LA ENERGIA</span>
          </h1>

          <div className="hero-bottom">
            <p>
              Estudio de ingenieria electrica dedicado a proyectos de alta
              complejidad para arquitectura moderna, obra nueva y espacios
              inteligentes.
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
              <span className="muted">DOMOTICA KNX</span>
              <span>CERTIFICACION AEA</span>
              <Zap size={20} style={{ color: accentColor }} />
            </div>
          ))}
        </div>
      </section>

      <section className="split-section split-section--light" id="servicios">
        <div className="split-shell split-shell--services">
          <Reveal className="split-panel split-panel--intro">
            <p className="section-kicker">Nuestras areas</p>
            <h2>Soluciones tecnicas para arquitectura vanguardista.</h2>
            <p className="split-copy">
              Diseno electrico, automatizacion y documentacion ejecutiva para
              obras donde la instalacion tiene que responder al lenguaje de la
              arquitectura, no pelearse con ella.
            </p>
          </Reveal>

          <div className="split-panel split-panel--stack">
            {services.map((service) => (
              <Reveal className="service-card service-card--wide" key={service.number}>
                <div className="service-card__top">
                  <span className="service-number">{service.number}</span>
                  <ArrowUpRight size={22} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section split-section--muted" id="proyectos">
        <div className="split-shell split-shell--projects">
          <Reveal className="split-panel split-panel--intro">
            <p className="section-kicker">Proyectos recientes</p>
            <h2>Diseno electrico para obras con criterio arquitectonico.</h2>
            <p className="split-copy">
              Intervenciones residenciales y corporativas donde el detalle
              tecnico sostiene la experiencia del espacio y la ejecucion de obra.
            </p>
            <a href="#contacto" className="text-link">
              Solicitar presentacion <ArrowRight size={16} />
            </a>
          </Reveal>

          <div className="split-panel split-panel--stack">
            {projects.map((project) => (
              <Reveal className="project-card project-card--row" key={project.title}>
                <div className="project-card__image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <p>{project.location}</p>
                    <h3>{project.title}</h3>
                  </div>
                </div>
                <div className="project-card__content">
                  <div className="project-card__meta">
                    <h4>{project.title}</h4>
                    <span>{project.year}</span>
                  </div>
                  <p className="project-card__location">{project.location}</p>
                  <p className="project-card__description">
                    Desarrollo de instalacion electrica integral, coordinacion
                    ejecutiva y definicion tecnica alineada con la obra.
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section split-section--dark">
        <div className="split-shell split-shell--dark">
          <Reveal className="split-panel split-panel--intro">
            <p className="section-kicker section-kicker--dark">Valor tecnico</p>
            <h2>
              El estandar que <span style={{ color: accentColor }}>exigen</span>{" "}
              los arquitectos.
            </h2>
            <p className="cta-copy">
              Documentacion tecnica impecable, coordinacion ejecutiva y
              seguridad normativa garantizada.
            </p>
          </Reveal>

          <div className="split-panel split-panel--stack">
            {highlights.map((item, index) => (
              <Reveal className="highlight-card" key={item.title}>
                <div className="highlight-card__icon">
                  {index === 0 ? (
                    <FileText size={24} style={{ color: accentColor }} />
                  ) : (
                    <Shield size={24} style={{ color: accentColor }} />
                  )}
                  <ArrowUpRight size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section split-section--light" id="contacto">
        <div className="split-shell split-shell--contact">
          <Reveal className="split-panel split-panel--intro">
            <p className="section-kicker">Contacto</p>
            <h2>Contanos tu proyecto y te respondemos por correo.</h2>
            <p>
              Formulario listo para recibir consultas residenciales,
              corporativas y tecnicas. El envio queda conectado a una API propia
              para no depender del navegador.
            </p>
          </Reveal>

          <Reveal className="contact-card contact-card--wide">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div>
          <div className="brand brand--footer">
            BA<span>.Studio</span>
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
            <a href="mailto:info@bastudio.com.ar">info@bastudio.com.ar</a>
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
