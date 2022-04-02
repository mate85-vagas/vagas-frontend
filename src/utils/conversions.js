/* eslint-disable import/prefer-default-export */

export const localDate = (isoDate) => {
  const localeDate = new Date(isoDate).toLocaleDateString()
  return localeDate === 'Invalid Date' ? 'Data não definida' : localeDate
}

export const numberToReais = (amount) => {
  return `R$ ${amount.toLocaleString('pt-BR', {
    minimumIntegerDigits: 2,
    useGrouping: true,
  })}`
}
