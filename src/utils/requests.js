/* eslint-disable import/prefer-default-export */

export const handleNotAuthorized = (response, navigate) => {
  const { notAuthorized } = response.data

  if (notAuthorized) {
    navigate('/login')
  }
}
