/* eslint-disable import/prefer-default-export */

const translations = {
  site_name: 'Talentos IC',
  not_informed: 'Não informado',
  yes: 'Sim',
  no: 'Não',
  invalid_date: 'Data não definida',
  invalid_salary: 'Salário Inválido',
  mandatory_not_filled: 'Alguns campos obrigatórios não foram preenchidos!',
  apply_to_job: 'Aplicar para esta vaga',
  profile_field_resume: 'URL do Currículo',
}

export const translate = (textName) => {
  if (!textName) return ''
  return translations[textName]
}
