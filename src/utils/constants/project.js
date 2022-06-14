/* eslint-disable import/prefer-default-export */

export const jobTypeLabel = {
  estagio: 'Estágio',
  trabalho: 'Trabalho',
  iniccient: 'Iniciação Cientifica',
  tcc: 'TCC',
  mestrado: 'Mestrado',
  doutorado: 'Doutorado',
  extensao: 'Extensão',
  pesquisa: 'Pesquisa',
  complementar: 'Complementar',
  outro: 'Outro',
}

export const filterLabel = {
  type: 'Tipo',
  workload: 'Carga horária',
  scholarity: 'Escolaridade',
  createdAt: 'Data de criação',
  site: 'Localidade',
  salary: 'Salário/Bolsa/Vencimento',
  name: 'Nome',
  technologies: 'Tecnologia',
  languages: 'Idioma',
  knowledge: 'Habilidade',
}

export const scholarityLabel = {
  notgrad: 'Não Graduado',
  supinc: 'Superior Incompleto',
  supc: 'Superior Completo',
  posgrad: 'Pós-Graduação',
}

export const jobTypes = Object.keys(jobTypeLabel).map((value, id) => ({
  id,
  value,
  label: jobTypeLabel[value],
}))

export const jobScholarities = Object.keys(scholarityLabel).map(
  (value, id) => ({
    id,
    value,
    label: scholarityLabel[value],
  })
)

export const appearOnSearchOptions = [
  {
    id: 0,
    value: true,
    label: 'Sim',
  },
  {
    id: 1,
    value: false,
    label: 'Não',
  },
]

export const itemsPerPageNumbers = ['5', '10', '20', '30', '50']

export const itemsPerPageOptions = itemsPerPageNumbers.map((number, id) => ({
  id,
  value: number,
  label: `${number} por página`,
}))

export const DEFAULT_SALARY = 0
