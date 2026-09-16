// Un objeto por trabajo, en el orden en que aparecen en /trabajos/.
// Las fotos y videos viven en R2 bajo trabajos/<slug>/ (ver scripts/subir-trabajo.sh);
// acá van solo los nombres de archivo. `title` son líneas: la última se pinta en acento.
export const trabajos = [
  {
    slug: "victron",
    label: "Registro de obra / Respaldo eléctrico",
    title: ["INVERSORES Y", "BATERÍAS."],
    intro: "Equipos Victron, tableros y banco de baterías en una misma instalación. " +
      "Un registro del trabajo, desde la preparación de los soportes hasta el montaje del conjunto.",
    tags: ["Tableros", "Canalizaciones", "Baterías"],
    cover: {
      image: "baterias.jpg",
      alt: "Banco de baterías junto a las bandejas y los equipos Victron",
      caption: "Imágenes reales del montaje"
    },
    stages: [
      { image: "soportes.jpg", title: "Preparación", text: "Presentación de soportes y referencias para el montaje." },
      { image: "montaje.jpg", title: "Montaje", text: "Gabinetes, bandejas y equipos colocados en la pared." },
      { image: "cableado.jpg", title: "Conexionado", text: "Trabajo sobre el tablero y tendido de conductores." },
      { image: "baterias.jpg", title: "Banco de baterías", text: "Vista del banco instalado junto a los equipos Victron." }
    ],
    video: {
      file: "recorrido.mp4",
      poster: "baterias.jpg",
      label: "Recorrido de la instalación",
      title: ["El conjunto,", "en video."],
      text: "Una vista de los equipos, el banco de baterías y el rack. Reproducilo para ver los detalles del montaje.",
      alt: "Recorrido del montaje con equipos Victron y banco de baterías"
    }
  }
];
