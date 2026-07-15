import { Instagram, Menu } from "lucide-react";
import { TikTokIcon } from "./TikTokIcon";

export function Navbar({ onOpenMenu }) {
  return (
    <nav className="site-nav">
      <a className="brand" href="#inicio">
        <strong>RG</strong>
        <span>Electric</span>
      </a>

      <div className="nav-links">
        <a href="#obra-real">Trabajos</a>
        <a href="#servicios">Servicios</a>
        <a href="#tablero">Proceso</a>
        <a
          className="nav-social"
          href="https://www.instagram.com/rggelectric/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram de RG Electric"
        >
          <Instagram size={19} strokeWidth={1.7} />
        </a>
        <a
          className="nav-social"
          href="https://www.tiktok.com/@rggelectric"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok de RG Electric"
        >
          <TikTokIcon size={18} />
        </a>
        <a href="#contacto" className="button button-dark">
          Contacto
        </a>
        <button
          className="menu-button"
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </nav>
  );
}
