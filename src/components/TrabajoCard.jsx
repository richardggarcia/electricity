import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Fragment, useState } from "react";
import { mediaUrl } from "../data/media";
import "./TrabajoCard.css";

// Líneas de un título separadas por <br/>; la última va en <span> (acento) si `accentLast`.
function Lines({ lines, accentLast = false }) {
  return lines.map((line, i) => {
    const last = i === lines.length - 1;
    return (
      <Fragment key={line}>
        {last && accentLast ? <span>{line}</span> : line}
        {!last && <br />}
      </Fragment>
    );
  });
}

export function TrabajoCard({ trabajo }) {
  const { slug, label, title, intro, tags, cover, stages, video } = trabajo;
  const [expanded, setExpanded] = useState(false);
  const file = (name) => mediaUrl(`trabajos/${slug}/${name}`);
  const titleId = `trabajo-${slug}-title`;
  const processId = `trabajo-${slug}-process`;

  return (
    <section className="trabajo-card" aria-labelledby={titleId}>
      <div className="trabajo-card__overview">
        <div className="trabajo-card__copy">
          <p className="rg-label">{label}</p>
          <h2 id={titleId}><Lines lines={title} accentLast /></h2>
          <p>{intro}</p>
          {tags?.length > 0 && (
            <div className="trabajo-card__tags" aria-label="Elementos del trabajo">
              {tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
          <button type="button" className="trabajo-card__toggle"
            aria-expanded={expanded} aria-controls={processId}
            onClick={() => setExpanded(!expanded)}>
            {expanded ? "Cerrar proceso" : "Ver trabajo"}
            {expanded ? <ArrowDown size={20} /> : <ArrowUpRight size={20} />}
          </button>
        </div>
        <figure className="trabajo-card__cover">
          <img src={file(cover.image)} width="900" height="1600"
            loading="lazy" alt={cover.alt} />
          {cover.caption && <figcaption>{cover.caption}</figcaption>}
        </figure>
      </div>
      <div id={processId} hidden={!expanded} className="trabajo-card__process">
        {expanded && <>
          <div className="trabajo-card__gallery">
            {stages.map((stage) => (
              <figure key={stage.image}>
                <img src={file(stage.image)} loading="lazy"
                  width="720" height="1280" alt={stage.text} />
                <figcaption><h3>{stage.title}</h3><p>{stage.text}</p></figcaption>
              </figure>
            ))}
          </div>
          {video && (
            <div className="trabajo-card__video">
              <div><p className="rg-label">{video.label}</p>
                <h3><Lines lines={video.title} /></h3>
                <p>{video.text}</p>
              </div>
              <video controls muted playsInline preload="none"
                poster={file(video.poster)}
                aria-label={video.alt}>
                <source src={file(video.file)} type="video/mp4" />
              </video>
            </div>
          )}
        </>}
      </div>
    </section>
  );
}
