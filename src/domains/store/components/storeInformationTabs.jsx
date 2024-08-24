import { useState } from "react"

import { StoreInformationInfo } from "./storeInformationInfo"
import { StoreInformationReview } from "./storeInformationReview"

export const StoreInformationTabs = () => {
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div>
      <div className="mb-4 flex cursor-pointer border-t border-t-gray-200 text-gray-500">
        <div
          onClick={() => setActiveTab("reviews")}
          className={`w-full px-4 py-2 text-center ${
            activeTab === "reviews"
              ? "border-b-2 border-orange-500 font-bold text-orange-500"
              : ""
          }`}
        >
          Avaliações
        </div>
        <div
          onClick={() => setActiveTab("info")}
          className={`w-full px-4 py-2 text-center ${
            activeTab === "info"
              ? "border-b-2 border-orange-500 font-bold text-orange-500"
              : ""
          }`}
        >
          Informações
        </div>
      </div>
      <div>
        {activeTab === "reviews" && <StoreInformationReview />}
        {activeTab === "info" && <StoreInformationInfo />}
      </div>
    </div>
  )
}
