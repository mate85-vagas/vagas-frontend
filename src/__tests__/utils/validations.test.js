import '@testing-library/jest-dom/extend-expect'
import { isEmailValid } from '../../utils/validations'

describe('testing isEmailValid function', () => {
  describe('when string is empty', () => {
    it('should return false', () => {
      expect(isEmailValid('')).toBeFalsy()
    })
  })

  describe('when string has a valid email', () => {
    it('should return true', () => {
      expect(isEmailValid('fulano.silva@email.com.br')).toBeTruthy()
      expect(isEmailValid('fulano@email.com')).toBeTruthy()
    })
  })

  describe('when string has an invalid email', () => {
    it('should return false', () => {
      expect(isEmailValid('fulano.silva')).toBeFalsy()
      expect(isEmailValid('@email.com')).toBeFalsy()
      expect(isEmailValid('fulano@email')).toBeFalsy()
      expect(isEmailValid('fulano@email.')).toBeFalsy()
    })
  })
})
