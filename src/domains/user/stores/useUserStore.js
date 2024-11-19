import { create } from "zustand"

import { localStorageUtil } from "../../../app/utils/localStorageUtil"

const useUserStore = create((set) => ({
  user: null,
  userId: null,
  isUserLoading: true,

  setUser: (data) => {
    set(() => ({
      user: data,
    }))
  },
  setUserId: (data) => {
    set(() => ({
      userId: data,
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

export default useUserStore
