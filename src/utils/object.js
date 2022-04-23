/* eslint-disable import/prefer-default-export */

export const assignDefined = (target, sources) => {
  if (!sources) return {}

  const newObject = target
  Object.keys(sources).map((key) => {
    if (sources[key] !== undefined) {
      newObject[key] = sources[key]
    }
    return key
  })
  return newObject
}

// export const byString = (object, lookup) => {
//   if (object === null || object === undefined) return

//   const keys = lookup.split('.')

//   let value = object

//   keys.forEach((key) => {
//     if (value[key] === null || value[key] === undefined) return
//     value = value[key]
//   })

//   return value
// }
