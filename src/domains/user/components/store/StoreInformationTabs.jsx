import { useState } from "react"

import { StoreInformationInfo } from "./StoreInformationInfo"
import { StoreInformationReview } from "./StoreInformationReview"

export function StoreInformationTabs() {
  const [activeTab, setActiveTab] = useState("reviews")

  return (
    <div className="antialiased">
      <div className="mb-4 flex cursor-pointer border-t border-t-gray-200 text-gray-500">
        <button
          onClick={() => setActiveTab("reviews")}
          className={`w-full px-4 py-2 text-center transition duration-300 hover:text-primary ${
            activeTab === "reviews"
              ? "border-b-2 border-orange-500 font-bold text-primary"
              : ""
          }`}
        >
          Avaliações
        </button>
        <button
          onClick={() => setActiveTab("info")}
          className={`w-full px-4 py-2 text-center transition duration-300 hover:text-primary ${
            activeTab === "info"
              ? "border-b-2 border-orange-500 font-bold text-primary"
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
