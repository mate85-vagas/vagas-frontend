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
  job_applied: 'Você já aplicou para esta vaga',
  profile_field_resume: 'URL do Currículo',
  no_options: 'Sem opções',
  applied_job_warning:
    'Fique atento ao seu e-mail, pois os responsáveis pelas vagas aplicadas poderão entrar em contato até que o prazo de candidaturas se encerre!',
}

// Translates a key to a text
export const translate = (textName) => {
  if (!textName) return ''
  return translations[textName]
}
