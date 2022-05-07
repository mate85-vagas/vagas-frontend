import '@testing-library/jest-dom/extend-expect'
import {
  localDate,
  numberToReais,
  sanitizeStringToSearch,
} from '../../utils/conversions'
import { translate } from '../../utils/translations'

describe('testing localDate function', () => {
  describe('when ISO-Date is empty or undefined', () => {
    it('should return the invalid date message', () => {
      expect(localDate('')).toBe(translate('invalid_date'))
      expect(localDate(undefined)).toBe(translate('invalid_date'))
    })
  })

  describe('when ISO-Date is wrongly formatted', () => {
    it('should return the invalid date message', () => {
      expect(localDate('2022-20-22')).toBe(translate('invalid_date'))
      expect(localDate('202220-22')).toBe(translate('invalid_date'))
    })
  })

  describe('when ISO-Date is formatted correctly', () => {
    it('should return the date on locale string', () => {
      const isoDate = '2022-02-22'
      expect(localDate(isoDate)).toBe(new Date(isoDate).toLocaleDateString())
    })
  })
})

describe('testing numberToReais function', () => {
  describe('when number is negative', () => {
    it('should return money invalid message', () => {
      expect(numberToReais(-1.19)).toBe(translate('invalid_salary'))
    })
  })

  describe('when number is undefined or 0', () => {
    it('should return the money string formatted of 0', () => {
      expect(numberToReais(undefined)).toBe('R$ 0,00')
      expect(numberToReais(0)).toBe('R$ 0,00')
    })
  })

  describe('when number is more than 0 and less than 1000', () => {
    it('should return the money string formatted', () => {
      expect(numberToReais(5)).toBe('R$ 5,00')
      expect(numberToReais(30)).toBe('R$ 30,00')
      expect(numberToReais(130)).toBe('R$ 130,00')
    })
  })

  describe('when number is more than 1000', () => {
    it('should return the money string formatted', () => {
      expect(numberToReais(5000)).toBe('R$ 5.000,00')
      expect(numberToReais(3000000)).toBe('R$ 3.000.000,00')
    })
  })

  describe('when number has decimals', () => {
    it('should return the money string formatted', () => {
      expect(numberToReais(30.2)).toBe('R$ 30,20')
      expect(numberToReais(5000.99)).toBe('R$ 5.000,99')
    })
  })
})

describe('testing sanitizeStringToSearch function', () => {
  describe('when string is empty', () => {
    it('should return empty', () => {
      expect(sanitizeStringToSearch('')).toBe('')
    })
  })

  describe('when string has no spaces', () => {
    it('should return the same string', () => {
      expect(sanitizeStringToSearch('aBcde')).toBe('aBcde')
    })
  })

  describe('when string has spaces', () => {
    it('should return formatted', () => {
      expect(sanitizeStringToSearch('   aBc   de   ')).toBe('aBc de')
    })
  })
})
