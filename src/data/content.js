export const accentColor = "#D9FF3F";

// Los rubros que se ofrecen. Este es el nivel de arriba: para sumar Obra Civil
// alcanza con agregar una entrada mas, sin tocar el resto de la pagina. Cuando
// un rubro crezca lo suficiente como para merecer su propia URL, este mismo
// objeto es lo que alimenta esa pagina.
export const areas = [
  {
    id: "electrica",
    number: "01",
    name: "Eléctrica",
    claim: "Tableros, circuitos y protecciones.",
    items: [
      "Tableros nuevos y adecuación de existentes",
      "Canalizaciones, tendido y conexionado",
      "Una protección por circuito, identificada",
      "Pruebas y puesta en servicio"
    ]
  },
  {
    id: "redes",
    number: "02",
    name: "Redes",
    claim: "Cableado estructurado y conectividad.",
    items: [
      "Cableado estructurado UTP y fibra",
      "Racks, patcheras y organización",
      "Puntos de acceso y cobertura WiFi",
      "Bocas etiquetadas y plano de red"
    ]
  }
];

export const projects = [
  {
    title: "Instalaciones Residenciales",
    location: "Viviendas y reformas",
    area: "Eléctrica",
    year: "TIPO 01",
    image:
      "https://images.unsplash.com/photo-1758101755915-462eddc23f57?auto=format&fit=crop&fm=webp&q=82&w=1800"
  },
  {
    title: "Locales y Oficinas",
    location: "Montaje y adecuaciones",
    area: "Eléctrica",
    year: "TIPO 02",
    image:
      "https://images.pexels.com/photos/21812146/pexels-photo-21812146.jpeg?auto=compress&cs=tinysrgb&w=1800"
  },
  {
    title: "Tableros Eléctricos",
    location: "Armado, montaje y conexión",
    area: "Eléctrica",
    year: "TIPO 03",
    image:
      "https://images.unsplash.com/photo-1744780940897-ef6337888c6e?auto=format&fit=crop&fm=webp&q=82&w=1800"
  }
];

export const services = [
  {
    number: "01",
    title: "Relevamiento y Planificación",
    description:
      "Vamos al lugar, revisamos lo que hay y definimos alcance, materiales y tiempos antes de empezar."
  },
  {
    number: "02",
    title: "Ejecución en Obra",
    description:
      "Hacemos el trabajo coordinando con el resto de la obra, sin dejar frentes abiertos."
  },
  {
    number: "03",
    title: "Documentación y Entrega",
    description:
      "Probamos, etiquetamos y entregamos los planos de lo que quedó instalado."
  }
];

export const highlights = [
  {
    title: "Planos y Diagramas",
    description: "Planos, diagramas y referencias para que quede registrado lo que se hizo."
  },
  {
    title: "Protecciones e Identificación",
    description: "Protecciones para cada circuito y rótulos claros dentro del tablero."
  },
  {
    title: "Seguimiento de Obra",
    description: "Coordinamos tareas, materiales y avances durante la instalación."
  }
];
