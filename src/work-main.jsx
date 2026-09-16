import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { VictronProject } from "./components/VictronProject";
import { whatsappUrl } from "./data/contact";
import "./styles.css";
import "./styles-modular.css";

function WorksPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="page-shell">
      <div className="noise-overlay" />
      <Navbar onOpenMenu={() => setMenuOpen(true)} />
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="works-page">
        <header className="works-page__intro">
          <a href="/" className="work-more-link">Volver al inicio</a>
          <p className="rg-label">RG Electric / Registro de obra</p>
          <h1>TRABAJOS.</h1>
          <p>Fotos y videos del proceso, los equipos y el montaje.</p>
        </header>
        <VictronProject />
      </main>
      <footer className="footer">
        <div><a className="brand" href="/"><strong>RG</strong><span>Electric</span></a>
          <p>Electricidad y redes<br />Caballito, CABA</p></div>
        <a href={whatsappUrl} className="button whatsapp-cta" target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><WorksPage /></React.StrictMode>
);
