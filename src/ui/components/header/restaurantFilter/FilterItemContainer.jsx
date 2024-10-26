import { useState } from "react"
//
export function FilterItemContainer({ title, items }) {
  const [activeItem, setActiveItem] = useState(null)

  function handleClick(index) {
    setActiveItem(index)
  }

  return (
    <div className="flex flex-col gap-1 p-2 text-gray-600">
      <h2 className="text-sm font-semibold">{title}</h2>

      <div className="flex gap-2">
        {items.map((item, index) => {
          return (
            <button
              key={index}
              className={`flex items-center rounded-full p-1 text-xs font-semibold ${
                activeItem === index
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
