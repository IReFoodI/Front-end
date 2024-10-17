export function setLocalStorageToken(token) {
  try {
    const storageToken = localStorage.setItem("access-token", token)
    return storageToken
  } catch (error) {
    console.log(error)
  }
}

export function getLocalStorageToken() {
  try {
    const storageToken = localStorage?.getItem("access-token")
    return storageToken
  } catch (error) {
    console.log(error)
  }
}
