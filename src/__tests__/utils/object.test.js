import '@testing-library/jest-dom/extend-expect'
import {
  assignDefined,
  getWithExpiry,
  saveWithExpiry,
} from '../../utils/object'

describe('testing assignDefined function', () => {
  describe('when source object is undefined', () => {
    it('should return an empty object', () => {
      expect(assignDefined({}, undefined)).toStrictEqual({})
    })
  })

  describe('when source object is empty', () => {
    it('should return an empty object', () => {
      expect(assignDefined({}, {})).toStrictEqual({})
    })
  })

  describe('when source object has not undefined keys', () => {
    it('should return an object with the same keys', () => {
      const source = { a: 1, b: 2 }
      expect(assignDefined({}, source)).toStrictEqual(source)
    })
  })

  describe('when source object has undefined keys', () => {
    it('should return an object with the same keys', () => {
      const source = { a: 1, b: 2, c: undefined }
      expect(assignDefined({}, source)).toStrictEqual({ a: 1, b: 2 })
    })
  })
})

describe('testing saveWithExpiry and getWithExpiry function', () => {
  describe('when saving a value with 5 seconds of TTL', () => {
    beforeEach(() => {
      saveWithExpiry('key', 'value', 5000)
    })

    it('should be able to get the value within the defined time', () => {
      expect(getWithExpiry('key')).toBe('value')
    })

    describe('when the time expires', () => {
      it('should not be able to get the value out of the defined time', () => {
        jest.useFakeTimers()
        setTimeout(() => {
          expect(getWithExpiry('key')).toBe(undefined)
        }, 5001)
        jest.runAllTimers()
      })
    })
  })
})
