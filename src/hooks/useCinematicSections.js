import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useCinematicSections() {
  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const sections = gsap.utils.toArray("[data-rg-section]");

      sections.forEach((section) => {
        const intro = section.querySelector("[data-rg-intro]");
        const items = gsap.utils.toArray("[data-rg-item]", section);

        if (intro) {
          gsap.fromTo(
            intro.children,
            { autoAlpha: 0, y: 48 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true
              }
            }
          );
        }

        items.forEach((item) => {
          const image = item.querySelector("img");

          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 72, clipPath: "inset(10% 0 0 0)" },
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0% 0 0 0)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 86%",
                once: true
              }
            }
          );

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.14 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8
                }
              }
            );
          }
        });
      });
    });

    return () => media.revert();
  });
}
