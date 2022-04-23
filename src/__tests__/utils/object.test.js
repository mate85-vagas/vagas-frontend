import '@testing-library/jest-dom/extend-expect'
import { assignDefined } from '../../utils/object'

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
