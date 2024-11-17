import { GeneralInformation } from "@/domains/store/components/GeneralInformation"
import { StoreInformationTabs } from "@/domains/store/components/StoreInformationTabs"
import { useRestaurant } from "@/domains/store/hooks/useRestaurant"

export function StoreInformationInfoLayout() {
  const { restaurantData } = useRestaurant()

  return (
    <div>
      <GeneralInformation />
      <StoreInformationTabs />
      <div id="other-info" className="grid place-items-center py-5">
        <h2 className="font-bold">Outras Informações</h2>
        <p className="text-sm">CNPJ: {restaurantData?.cnpj}</p>
      </div>
    </div>
  )
}
