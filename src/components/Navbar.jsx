import { Menu } from "lucide-react";

export function Navbar({ onOpenMenu }) {
  return (
    <nav className="site-nav">
      <a className="brand" href="#inicio">
        <strong>RG</strong>
        <span>Ingenieria Electrica</span>
      </a>

      <div className="nav-links">
        <a href="#proyectos">Proyectos</a>
        <a href="#servicios">Ingenieria</a>
        <a href="#tablero">Proceso</a>
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
