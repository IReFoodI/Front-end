import { useState } from "react"

import { StoreInformationInfo } from "./storeInformationInfo"
import { StoreInformationReview } from "./storeInformationReview"

export const StoreInformationTabs = () => {
  const [activeTab, setActiveTab] = useState("reviews")

  return (
    <div className="antialiased">
      <div className="mb-4 flex cursor-pointer border-t border-t-gray-200 text-gray-500">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`w-full px-4 py-2 text-center transition duration-300 hover:text-orange-700 ${
            activeTab === "reviews"
              ? "border-b-2 border-orange-500 font-bold text-orange-500"
              : ""
          }`}
        >
          Avaliações
        </button>
        <button
          onClick={() => setActiveTab("info")}
          className={`w-full px-4 py-2 text-center transition duration-300 hover:text-orange-700 ${
            activeTab === "info"
              ? "border-b-2 border-orange-500 font-bold text-orange-500"
              : ""
          }`}
        >
          Informações
        </button>
      </div>
      <div>
        {activeTab === "reviews" && <StoreInformationReview />}
        {activeTab === "info" && <StoreInformationInfo />}
      </div>
    </div>
  )
}
