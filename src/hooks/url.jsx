/* eslint-disable import/prefer-default-export */

import { useSearchParams } from 'react-router-dom'

export const useSearchObject = () => {
  const [search, setSearch] = useSearchParams()
  const searchAsObject = Object.fromEntries(new URLSearchParams(search))

  return [searchAsObject, setSearch]
}
