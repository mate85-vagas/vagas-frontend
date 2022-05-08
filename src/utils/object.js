/* eslint-disable import/prefer-default-export */

// Assigns to 'target' object only the keys on 'sources' that are not undefined.
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

// Saves a key-value pair on localStorage with an expiration time (ttl) in seconds
export const saveWithExpiry = (key, value, ttl) => {
  const now = new Date()
  const item = {
    value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// Gets a value on localStorage that has an expiration time. Returns undefined
// if it is expired.
export const getWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) return undefined

  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return undefined
  }

  return item.value
}
