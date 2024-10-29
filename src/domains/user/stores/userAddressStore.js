import { create } from "zustand"

const userAddressStore = create((set) => ({
  addresses: null,
  defaultAddress: null,
  otherAddresses: null,
  isModalOpen: false,
  isDefaultModalOpen: false,

  setAddresses: (data) => {
    const defaultAddress = data?.find((address) => address.isStandard === true)
    const otherAddrs = data?.filter((address) => !address.isStandard)

    set(() => ({
      addresses: data,
      defaultAddress: defaultAddress || null,
      otherAddresses: otherAddrs,
    }))
  },
}))

export { userAddressStore }
