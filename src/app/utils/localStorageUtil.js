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

function getLocalStorageToken() {
  try {
    const storageToken = localStorage?.getItem(KEYS.TOKEN)
    return storageToken
  } catch (error) {
    console.log(error)
  }
}

function setLocalStorageUserId(id) {
  try {
    const storageId = localStorage?.setItem(KEYS.USER_ID, id)
    return storageId
  } catch (error) {
    console.log(error)
  }
}

function getLocalStorageUserId() {
  try {
    const storageId = localStorage?.getItem(KEYS.USER_ID)
    return storageId
  } catch (error) {
    console.log(error)
  }
}

export const localStorageUtil = {
  setLocalStorageToken,
  getLocalStorageToken,
  setLocalStorageUserId,
  getLocalStorageUserId,
}
