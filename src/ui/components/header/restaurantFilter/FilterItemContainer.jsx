import { useState } from "react"
import { v4 as uuid } from "uuid"
export function FilterItemContainer({ title, items }) {
  const [activeItems, setActiveItems] = useState([])

  function handleClick(index) {
    if (activeItems.some((val) => val === index)) {
      setActiveItems((prev) => prev.filter((val) => val !== index))
      return
    }
    setActiveItems((prev) => [...prev, index])
  }

  return (
    <div className="flex flex-col gap-1 py-2 text-gray-600">
      <h2 className="text-sm font-semibold">{title}</h2>

      <div className="flex gap-2">
        {items.map((item, index) => {
          return (
            <button
              key={uuid()}
              className={`flex items-center rounded-full p-1 text-xs font-semibold ${
                activeItems.some((i) => i === index)
                  ? "bg-orange-100 text-primary"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleClick(index)}
            >
              <span>{item.imageSource}</span>
              <span className="px-1">{item.buttonTitle}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
