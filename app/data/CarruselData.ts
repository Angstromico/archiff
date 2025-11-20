export const teachersData = [
  {
    name: 'Ramón Esteve',
    type: 'Ramón Esteve Estudio',
    link: 'https://ramonesteve.com',
  },
  {
    name: 'Eduardo Tazón y Antonio Mora',
    type: 'STUDIO.NOJU',
    link: 'https://studionoju.com',
  },
  { name: 'Marcos Parera', type: 'Mesura', link: 'https://www.mesura.eu' },
  {
    name: 'Juan Ranchal',
    type: 'Janfri & Ranchal Studio',
    link: 'https://www.janfriranchal.com',
  },
  {
    name: 'Ikér Ochotorena',
    type: 'OOAA Arquitectura',
    link: 'https://ooaa.es',
  },
  {
    name: 'Sigfrido Serra',
    type: 'Sigfrido Serra Studio',
    link: 'https://www.sigfridoserra.com/en/studio/',
  },
  {
    name: 'Alberto Eltini',
    type: 'El Departamento',
    link: 'https://www.eldepartamento.net/about/',
  },
  {
    name: 'Ángela Montagud y Jordi Iranzo',
    type: 'Clap Studio',
    link: 'https://weareclap.com/studio/',
  },
  {
    name: 'Francesc Rifé',
    type: 'Francesc Rifé Studio',
    link: 'https://www.francescrifestudio.com/es/',
  },
  {
    name: 'Enric Pastor',
    type: 'Fundador y editor de MANERA EDICIONES',
    link: 'https://www.linkedin.com/in/enricpastor/?originalSubdomain=es',
  },
  {
    name: 'Albert Gil',
    type: 'CEO de Batlle i Roig',
    link: 'https://www.batlleiroig.com/en/about/team/',
  },
  {
    name: 'Hernani Fernández',
    type: 'Fundador de Arqueha',
    link: 'https://www.linkedin.com/in/hernani-fern%C3%A1ndez-gomes-dos-santos-0aa79218/',
  },
]

export interface FormationCardProps {
  hours: number
  label?: string
  title: string
  teacher: string
  price: number
}

export const formationsCardsNumbers: FormationCardProps[] = [
  {
    hours: 6,
    title: 'Curso de Interiorismo para Arquitectos',
    teacher: 'Un curso de Sigfrido Serra, Sigfrido Serra Studio.',
    price: 199,
  },
  {
    hours: 6,
    label: 'NUEVO',
    title: 'Formación en Diseño de Porfolios Creativos',
    teacher: 'Un curso de Juan Ferrero, CEO de Ramón Esteve Estudio.',
    price: 120,
  },
  {
    hours: 31,
    label: 'PACK OFERTA',
    title: 'Pack. Calculo de honorarios y gestión de estudios.',
    teacher: 'Un curso de Susana Lluna, Raúl Bosque, Juan Ferrero y Maty Tchey',
    price: 499,
  },
  {
    hours: 6,
    title: 'Formación en Gestión de Proyectos',
    teacher:
      'Un curso de Jesús Rodríguez, director de la oficina de Madrid en Ramón Esteve Estudio.',
    price: 199,
  },
  {
    hours: 25,
    label: 'TOP VENTAS',
    title: 'Formación en Gestión de Estudios',
    teacher: 'Un curso de Susana Lluna, Raúl Bosque, Juan Ferrero y Maty Tchey',
    price: 399,
  },
  {
    hours: 6,
    label: 'NUEVO',
    title: 'Formación en Cálculo de honorarios',
    teacher: 'Un curso de Juan Ferrero, CEO de Ramón Esteve Estudio.',
    price: 199,
  },
  {
    hours: 2,
    label: 'NUEVO',
    title: 'Formación de Hubspot para arquitectos e interioristas',
    teacher: 'Un curso de Marcos García.',
    price: 50,
  },
]

export const FAQSInformation = [
  {
    question: '¿Cuándo empiezan y acaban nuestras formaciones?',
    answer:
      'En ARCHIFF ofrecemos cursos, másters y workshops con distintas modalidades. Los cursos online comienzan cuando tú lo decidas: son totalmente a tu ritmo y con acceso de por vida al contenido. Los másters cuentan con dos ediciones al año, iniciando en abril o en octubre según el programa, mientras que los workshops se programan en fechas específicas. Te recomendamos consultar la página de cada formación para conocer el calendario exacto.',
  },
  {
    question:
      '¿Son necesarios conocimientos previos para poder realizar la formación?',
    answer:
      'No es necesario tener conocimientos previos para realizar nuestros cursos: están diseñados para avanzar a tu ritmo. En el caso de los másters, recomendamos contar con una base en la materia para aprovechar al máximo la experiencia. Y si tienes dudas, nuestro equipo de atención al alumno puede asesorarte personalmente y ayudarte a elegir la formación más adecuada para ti. Reserva una videollamada aquí.',
  },
  {
    question: '¿Existe la posibilidad de financiarlo?',
    answer:
      'Sí, puedes financiar tu formación hasta en 3 meses sin intereses a través de PayPal. Además, nuestro equipo de atención al alumno puede informarte sobre las becas disponibles y ayudarte a encontrar la mejor opción para ti. Consúltalo aquí.',
  },
  {
    question: '¿Necesito alguna app para realizarlas formaciones?',
    answer:
      'No. La plataforma de ARCHIFF está diseñada para ser cómoda, sencilla y accesible desde tu ordenador, tablet o móvil, sin necesidad de instalar ninguna aplicación extra. Así, puedes centrarte en lo importante: aprender y avanzar hacia tus objetivos.',
  },
]
