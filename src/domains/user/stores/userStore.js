import { create } from "zustand"

import { localStorageUtil } from "../../../app/utils/localStorageUtil"

const userStore = create()((set) => ({
  user: null,
  isUserLoading: true,

  setUser: (data) => {
    set(() => ({
      user: data,
    }))
  },
  logout: () => {
    set(() => ({ user: null }))
    localStorageUtil.removeLocalStorageToken()
  },
  setIsUserLoading: (loading) => {
    set(() => ({ isUserLoading: loading }))
  },
}))

export default userStore
