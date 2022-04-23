import '@testing-library/jest-dom/extend-expect'
import { translate } from '../../utils/translations'

describe('testing translate function', () => {
  describe('when text name is empty', () => {
    it('should return an empty string', () => {
      expect(translate('')).toBe('')
    })
  })

  describe('when text name is not empty', () => {
    it('should return the correct translation', () => {
      expect(translate('site_name')).toBe('Talentos IC')
    })
  })
})
