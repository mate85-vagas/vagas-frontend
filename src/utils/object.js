/* eslint-disable import/prefer-default-export */

export const assignDefined = (target, sources) => {
  const newObject = target
  Object.keys(sources).map((key) => {
    if (sources[key] !== undefined) {
      newObject[key] = sources[key]
    }
    return key
  })
  return newObject
}
