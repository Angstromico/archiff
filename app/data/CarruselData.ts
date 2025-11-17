export const teachersData = [
  { name: 'Ramón Esteve', type: 'Ramón Esteve Estudio' },
  { name: 'Eduardo Tazón y Antonio Mora', type: 'STUDIO.NOJU' },
  { name: 'Marcos Parera', type: 'Mesura' },
  { name: 'Juan Ranchal', type: 'Janfri & Ranchal Studio' },
  { name: 'Ikér Ochotorena', type: 'OOAA Arquitectura' },
  { name: 'Sigfrido Serra', type: 'Sigfrido Serra Studio' },
  { name: 'Alberto Eltini', type: 'El Departamento' },
  { name: 'Ángela Montagud y Jordi Iranzo', type: 'Clap Studio' },
  { name: 'Francesc Rifé', type: 'Francesc Rifé Studio' },
  { name: 'Enric Pastor', type: 'Fundador y editor de MANERA EDICIONES' },
  { name: 'Albert Gil', type: 'CEO de Batlle i Roig' },
  { name: 'Hernani Fernández', type: 'Fundador de Arqueha' },
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
