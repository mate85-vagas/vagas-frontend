/* eslint-disable import/prefer-default-export */

import { translate } from './translations'

export const localDate = (isoDate) => {
  const localeDate = new Date(isoDate).toLocaleDateString()
  return localeDate === 'Invalid Date' ? translate('invalid_date') : localeDate
}

export const numberToReais = (amount) => {
  let number = amount
  if (!amount) number = 0

  if (amount < 0) return translate('invalid_salary')

  return `R$ ${number.toLocaleString('pt-BR', {
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    useGrouping: true,
  })}`
}
