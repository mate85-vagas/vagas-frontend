/* eslint-disable import/prefer-default-export */

const translations = {
  not_informed: 'Não informado',
  yes: 'Sim',
  no: 'Não',
}

export const translate = (textName) => {
  return translations[textName]
}
