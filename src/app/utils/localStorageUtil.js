const KEYS = {
  TOKEN: "access-token",
  USER_ID: "user-id",
}

function setLocalStorageToken(token) {
  try {
    const storageToken = localStorage.setItem(KEYS.TOKEN, token)
    return storageToken
  } catch (error) {
    console.log(error)
  }
}

function removeLocalStorageToken() {
  try {
    localStorage?.removeItem(KEYS?.TOKEN)
  } catch (error) {
    console.log(error)
  }
}

function getLocalStorageToken() {
  try {
    const storageToken = localStorage?.getItem(KEYS.TOKEN)
    return storageToken
  } catch (error) {
    console.log(error)
  }
}

export const localStorageUtil = {
  setLocalStorageToken,
  getLocalStorageToken,
  removeLocalStorageToken,
}
