/* eslint-disable import/prefer-default-export */

import { translate } from './translations'

// Gets an string in iso format and transforms to locale format
export const localDate = (isoDate) => {
  const localeDate = new Date(isoDate).toLocaleDateString()
  return localeDate === 'Invalid Date' ? translate('invalid_date') : localeDate
}

// Formats a number to money in Reais
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

// Removes all left and right whitespaces of a string and left only one whitespace between
// characters
export const sanitizeStringToSearch = (text) =>
  text.trim().replace(/\s\s+/g, ' ')
