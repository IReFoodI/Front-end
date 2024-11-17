import { StoreInformationInfo } from "./StoreInformationInfo"
import { StoreInformationReview } from "./StoreInformationReview"

export function GeneralInformation() {
  return (
    <section className="mt-8 hidden grid-cols-2 flex-col gap-x-5 text-gray-500 antialiased sm:grid">
      <h2 className="text-xl font-bold text-gray-700 md:text-xl">Avaliações</h2>
      <h2 className="col-span-1 text-xl font-bold text-gray-700 md:text-xl">
        Informações
      </h2>
      <StoreInformationReview />
      <StoreInformationInfo />
    </section>
  )
}
