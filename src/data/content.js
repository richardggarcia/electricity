export const accentColor = "#D9FF3F";

// Los rubros que se ofrecen. Este es el nivel de arriba: para sumar Obra Civil
// alcanza con agregar una entrada mas, sin tocar el resto de la pagina. Cuando
// un rubro crezca lo suficiente como para merecer su propia URL, este mismo
// objeto es lo que alimenta esa pagina.
export const areas = [
  {
    id: "electrica",
    number: "01",
    name: "Electricidad",
    claim: "Tableros, circuitos y protecciones.",
    items: [
      "Tableros nuevos y adecuación de existentes",
      "Canalizaciones, tendido y conexionado",
      "Revisión y reemplazo de protecciones",
      "Pruebas y puesta en servicio"
    ]
  },
  {
    id: "redes",
    number: "02",
    name: "Redes",
    claim: "Cableado de red para locales, oficinas y viviendas.",
    items: [
      "Cableado estructurado UTP",
      "Montaje de racks y patcheras",
      "Instalación de bocas de red",
      "Ordenamiento del cableado existente"
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
    title: "Visita y presupuesto",
    description:
      "Conversamos sobre lo que necesitás y coordinamos una visita cuando hace falta. Con esa información preparamos el presupuesto."
  },
  {
    number: "02",
    title: "Instalación",
    description:
      "Acordamos las tareas y las fechas antes de empezar. Si hay otros gremios trabajando, coordinamos con ellos."
  },
  {
    number: "03",
    title: "Revisión final",
    description:
      "Revisamos el funcionamiento de la instalación y te explicamos qué se hizo."
  }
];

export const highlights = [
  {
    title: "Tablero Rotulado",
    description: "Cada llave con su rótulo, para saber qué corta cada una sin adivinar."
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
