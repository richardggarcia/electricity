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
    title: "Primero revisamos la instalacion.",
    description:
      "Medimos, identificamos circuitos y revisamos el tablero antes de definir el trabajo.",
    image:
      "https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&fm=webp&q=82&w=2200",
    position: "center"
  },
  {
    number: "02",
    kicker: "Protecciones",
    title: "Cada circuito, con su proteccion.",
    description:
      "Separamos cargas, ordenamos la distribucion y colocamos las protecciones necesarias.",
    image:
      "https://images.pexels.com/photos/33531832/pexels-photo-33531832.jpeg?auto=compress&cs=tinysrgb&w=2200",
    position: "center"
  },
  {
    number: "03",
    kicker: "Montaje",
    title: "Tableros claros y cableado ordenado.",
    description:
      "Armamos, identificamos y conectamos para que la instalacion sea facil de revisar y mantener.",
    image:
      "https://images.pexels.com/photos/21812146/pexels-photo-21812146.jpeg?auto=compress&cs=tinysrgb&w=2200",
    position: "center"
  },
  {
    number: "04",
    kicker: "Pruebas",
    title: "Probamos todo antes de entregar.",
    description:
      "Revisamos conexiones, protecciones y funcionamiento antes de dar el trabajo por terminado.",
    image:
      "https://images.unsplash.com/photo-1744780940897-ef6337888c6e?auto=format&fit=crop&fm=webp&q=82&w=2200",
    position: "center"
  }
];

export function ElectricalStory() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const progressRef = useRef(null);

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
            end: "+=240%",
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
                loading={index === 0 ? "eager" : "lazy"}
                style={{ objectPosition: scene.position }}
              />
            </div>
          ))}
          <div className="electrical-story__scrim" />
          <div className="electrical-story__grain" />
        </div>

        <div className="electrical-story__topline">
          <span>RG ELECTRIC / INSTALACIONES ELECTRICAS</span>
          <span>SECUENCIA 01-04</span>
        </div>

        <div className="electrical-story__copies">
          {scenes.map((scene) => (
            <article
              className="electrical-story__copy"
              data-story-copy
              key={scene.number}
            >
              <p>{scene.number} / {scene.kicker}</p>
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
            Scroll para avanzar <ArrowDown size={14} />
          </div>
          <div className="electrical-story__credits">
            Fotos de prueba: <a href="https://unsplash.com/photos/electrician-testing-electrical-panel-with-multimeter-PkHf7BUWbtk" target="_blank" rel="noreferrer">Unsplash</a>
            {" / "}
            <a href="https://www.pexels.com/photo/electrician-diagnosing-electrical-panel-with-multimeter-34054464/" target="_blank" rel="noreferrer">Pexels</a>
          </div>
        </div>
      </div>
    </section>
  );
}
