import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const scenes = [
  {
    number: "01",
    kicker: "Relevamiento",
    title: "Revisión de la instalación.",
    description:
      "Revisamos el tablero y los circuitos para determinar qué hay que reparar, cambiar o ampliar.",
    image:
      "https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&fm=webp&q=82&w=2200",
    position: "center"
  },
  {
    number: "02",
    kicker: "Protecciones",
    title: "Reparaciones y mejoras.",
    description:
      "Reemplazamos componentes deteriorados y adecuamos las protecciones según el trabajo previsto.",
    image:
      "https://images.pexels.com/photos/33531832/pexels-photo-33531832.jpeg?auto=compress&cs=tinysrgb&w=2200",
    position: "center"
  },
  {
    number: "03",
    kicker: "Montaje",
    title: "Armado de tableros.",
    description:
      "Montamos y conectamos los componentes del tablero, tanto en instalaciones nuevas como en reformas.",
    image:
      "https://images.pexels.com/photos/21812146/pexels-photo-21812146.jpeg?auto=compress&cs=tinysrgb&w=2200",
    position: "center"
  },
  {
    number: "04",
    kicker: "Pruebas",
    title: "Pruebas de funcionamiento.",
    description:
      "Realizamos las comprobaciones de la instalación y revisamos las conexiones antes de la puesta en servicio.",
    image:
      "https://images.unsplash.com/photo-1744780940897-ef6337888c6e?auto=format&fit=crop&fm=webp&q=82&w=2200",
    position: "center"
  }
];

export function ElectricalStory() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(null);
  const loadedFrames = useRef(0);

  // ScrollTrigger mide al montar; los frames llegan despues y pueden mover el
  // alto del pin, asi que se recalcula una vez cuando termina de cargar el set.
  const handleFrameLoad = () => {
    loadedFrames.current += 1;

    if (loadedFrames.current === scenes.length) {
      ScrollTrigger.refresh();
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const frames = gsap.utils.toArray("[data-story-frame]", section);
      const copies = gsap.utils.toArray("[data-story-copy]", section);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(frames.slice(1), { autoAlpha: 0, scale: 1.045 });
        gsap.set(copies.slice(1), { autoAlpha: 0, y: 34 });
        gsap.set(progressRef.current, { scaleX: 1 / scenes.length });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => window.innerWidth <= 680 ? "+=150%" : "+=220%",
            scrub: 0.8,
            pin: stageRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        for (let index = 1; index < scenes.length; index += 1) {
          timeline
            .to(frames[index - 1], { autoAlpha: 0, duration: 0.35 }, index)
            .fromTo(
              frames[index],
              { autoAlpha: 0, scale: 1.045 },
              { autoAlpha: 1, scale: 1, duration: 0.65 },
              index
            )
            .to(copies[index - 1], { autoAlpha: 0, y: -24, duration: 0.3 }, index)
            .fromTo(
              copies[index],
              { autoAlpha: 0, y: 34 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              index + 0.12
            )
            .to(
              progressRef.current,
              { scaleX: (index + 1) / scenes.length, duration: 0.6 },
              index
            );
        }

        // Sin este tramo la ultima escena entra justo cuando el pin se suelta y
        // su titulo nunca llega a leerse.
        timeline.to({}, { duration: 0.6 }, scenes.length);
      });

      return () => media.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section className="electrical-story" id="tablero" ref={sectionRef}>
      <div className="electrical-story__stage" ref={stageRef}>
        <div className="electrical-story__frames" aria-hidden="true">
          {scenes.map((scene, index) => (
            <div
              className="electrical-story__frame"
              data-story-frame
              key={scene.number}
            >
              <img
                src={scene.image}
                alt=""
                loading="eager"
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                onLoad={handleFrameLoad}
                style={{ objectPosition: scene.position }}
              />
            </div>
          ))}
          <div className="electrical-story__scrim" />
          <div className="electrical-story__grain" />
        </div>

        <div className="electrical-story__topline">
          <span>RG ELECTRIC / INSTALACIONES ELÉCTRICAS</span>
          <span>EN OBRA</span>
        </div>

        <div className="electrical-story__copies">
          {scenes.map((scene) => (
            <article
              className="electrical-story__copy"
              data-story-copy
              key={scene.number}
            >
              <p>{scene.kicker}</p>
              <h2>{scene.title}</h2>
              <span>{scene.description}</span>
            </article>
          ))}
        </div>

        <div className="electrical-story__footer">
          <div className="electrical-story__progress">
            <span ref={progressRef} />
          </div>
          <div className="electrical-story__scroll">
            Deslizá para ver más <ArrowDown size={14} />
          </div>
          <div className="electrical-story__credits">
            Imágenes de referencia: <a href="https://unsplash.com/photos/electrician-testing-electrical-panel-with-multimeter-PkHf7BUWbtk" target="_blank" rel="noreferrer">Unsplash</a>
            {" / "}
            <a href="https://www.pexels.com/photo/electrician-diagnosing-electrical-panel-with-multimeter-34054464/" target="_blank" rel="noreferrer">Pexels</a>
          </div>
        </div>
      </div>
    </section>
  );
}
