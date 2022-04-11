/* eslint-disable import/prefer-default-export */

const translations = {
  not_informed: 'Não informado',
  yes: 'Sim',
  no: 'Não',
  mandatory_not_filled: 'Alguns campos obrigatórios não foram preenchidos!',
}

export const translate = (textName) => {
  return translations[textName]
}
