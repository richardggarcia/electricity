import { Instagram, X } from "lucide-react";
import { TikTokIcon } from "./TikTokIcon";
import { whatsappUrl } from "../data/contact";

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
        <a href="#obra-real" onClick={onClose}>
          Trabajos
        </a>
        <a href="#rubros" onClick={onClose}>
          Servicios
        </a>
        <a href="#servicios" onClick={onClose}>
          Proceso
        </a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={onClose}>
          WhatsApp
        </a>
        <div className="mobile-menu__socials">
          <a
            className="mobile-menu__social"
            href="https://www.instagram.com/rggelectric/"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
          >
            <Instagram size={22} strokeWidth={1.7} />
            <span>Instagram</span>
          </a>
          <a
            className="mobile-menu__social"
            href="https://www.tiktok.com/@rggelectric"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
          >
            <TikTokIcon size={21} />
            <span>TikTok</span>
          </a>
          <small>@rggelectric</small>
        </div>
      </div>
    </div>
  );
}
