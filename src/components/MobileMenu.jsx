import { X } from "lucide-react";

export function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__header">
        <div className="brand">
          <strong>RG</strong>
          <span>Electric</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar menu">
          <X size={30} />
        </button>
      </div>

      <div className="mobile-menu__links">
        <a href="#proyectos" onClick={onClose}>
          Proyectos
        </a>
        <a href="#servicios" onClick={onClose}>
          Servicios
        </a>
        <a href="#tablero" onClick={onClose}>
          Proceso
        </a>
        <a href="#contacto" onClick={onClose}>
          Contacto
        </a>
      </div>
    </div>
  );
}
