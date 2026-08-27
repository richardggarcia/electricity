import { Network, Zap } from "lucide-react";
import { areas } from "../data/content";

// El icono se resuelve por el id del area, no por posicion, para que sumar o
// reordenar rubros en content.js no desalinee la lista.
const areaIcons = {
  electrica: Zap,
  redes: Network
};

export function ServiceAreas() {
  return (
    <section className="rg-areas" id="rubros" data-rg-section>
      <div className="rg-section-heading" data-rg-intro>
        <p className="rg-label">Rubros</p>
        <h2>ELÉCTRICA<br />Y REDES.</h2>
      </div>

      <div className="rg-areas__grid">
        {areas.map((area) => {
          const AreaIcon = areaIcons[area.id];

          return (
            <article className="rg-area" data-rg-item key={area.id}>
              <div className="rg-area__head">
                <span className="rg-card-number">{area.number}</span>
                {AreaIcon ? (
                  <AreaIcon strokeWidth={1.15} aria-hidden="true" />
                ) : null}
              </div>

              <h3>{area.name}</h3>
              <p className="rg-area__claim">{area.claim}</p>

              <ul className="rg-area__items">
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
