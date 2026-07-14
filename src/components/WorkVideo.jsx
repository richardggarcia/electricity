import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function WorkVideo() {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const media = mediaRef.current;
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!media || !video || reducedMotion.matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => setIsPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(media);
    return () => observer.disconnect();
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      video.play().catch(() => setIsPlaying(false));
    }
  };

  return (
    <section className="rg-work-video" id="obra-real" data-rg-section>
      <div className="rg-work-video__copy" data-rg-intro>
        <p className="rg-label">Registro de obra / Tablero</p>
        <h2>
          ARMADO Y
          <span>PUESTA EN SERVICIO.</span>
        </h2>
        <p className="rg-work-video__description">
          Armado, conexionado y puesta en servicio del tablero.
        </p>

        <div className="rg-work-video__steps" aria-label="Etapas del trabajo">
          <span><b>01</b> Armado</span>
          <span><b>02</b> Terminado</span>
          <span><b>03</b> En servicio</span>
        </div>
      </div>

      <div className="rg-work-video__media" data-rg-item ref={mediaRef}>
        <div className="rg-work-video__frame">
          <video
            ref={videoRef}
            loop
            muted={isMuted}
            playsInline
            preload="metadata"
            poster="/media/rg-tablero-poster.jpg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            aria-label="Armado y puesta en servicio de un tablero electrico"
          >
            <source src="/media/rg-tablero-en-servicio.mp4" type="video/mp4" />
          </video>

          <div className="rg-work-video__controls">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Activar sonido" : "Silenciar video"}
              aria-pressed={!isMuted}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
              aria-pressed={isPlaying}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        </div>

        <div className="rg-work-video__caption">
          <span>16 SEG</span>
          <span>Armado / Terminado / En servicio</span>
        </div>
      </div>
    </section>
  );
}
