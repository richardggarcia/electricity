import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { mediaUrl } from "../data/media";
import "./VictronProject.css";

const stages = [
  { image: "soportes", title: "Preparación", text: "Presentación de soportes y referencias para el montaje." },
  { image: "montaje", title: "Montaje", text: "Gabinetes, bandejas y equipos colocados en la pared." },
  { image: "cableado", title: "Conexionado", text: "Trabajo sobre el tablero y tendido de conductores." },
  { image: "baterias", title: "Banco de baterías", text: "Vista del banco instalado junto a los equipos Victron." }
];

export function VictronProject() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="victron-project" aria-labelledby="victron-title">
      <div className="victron-project__overview">
        <div className="victron-project__copy">
          <p className="rg-label">Registro de obra / Respaldo eléctrico</p>
          <h2 id="victron-title">INVERSORES Y<br /><span>BATERÍAS.</span></h2>
          <p>Equipos Victron, tableros y banco de baterías en una misma instalación.
            Un registro del trabajo, desde la preparación de los soportes hasta el montaje del conjunto.</p>
          <div className="victron-project__tags" aria-label="Elementos del trabajo">
            <span>Tableros</span><span>Canalizaciones</span><span>Baterías</span>
          </div>
          <button type="button" className="victron-project__toggle"
            aria-expanded={expanded} aria-controls="victron-process"
            onClick={() => setExpanded(!expanded)}>
            {expanded ? "Cerrar proceso" : "Ver trabajo"}
            {expanded ? <ArrowDown size={20} /> : <ArrowUpRight size={20} />}
          </button>
        </div>
        <figure className="victron-project__cover">
          <img src={mediaUrl("trabajos/victron/baterias.jpg")} width="900" height="1600"
            loading="lazy" alt="Banco de baterías junto a las bandejas y los equipos Victron" />
          <figcaption>Imágenes reales del montaje</figcaption>
        </figure>
      </div>
      <div id="victron-process" hidden={!expanded} className="victron-project__process">
        {expanded && <>
          <div className="victron-project__gallery">
            {stages.map((stage) => (
              <figure key={stage.image}>
                <img src={mediaUrl(`trabajos/victron/${stage.image}.jpg`)} loading="lazy"
                  width="720" height="1280" alt={stage.text} />
                <figcaption><h3>{stage.title}</h3><p>{stage.text}</p></figcaption>
              </figure>
            ))}
          </div>
          <div className="victron-project__video">
            <div><p className="rg-label">Recorrido de la instalación</p>
              <h3>El conjunto,<br />en video.</h3>
              <p>Una vista de los equipos, el banco de baterías y el rack.
                Reproducilo para ver los detalles del montaje.</p>
            </div>
            <video controls muted playsInline preload="none"
              poster={mediaUrl("trabajos/victron/baterias.jpg")}
              aria-label="Recorrido del montaje con equipos Victron y banco de baterías">
              <source src={mediaUrl("trabajos/victron/recorrido.mp4")} type="video/mp4" />
            </video>
          </div>
        </>}
      </div>
    </section>
  );
}
