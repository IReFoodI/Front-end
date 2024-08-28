import { useState } from "react"

function FilterItemContainer({ title, items }) {
  const [activeItem, setActiveItem] = useState(null)

  function handleClick(index) {
    setActiveItem(index)
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      <h2 className="text-sm font-semibold">{title}</h2>

      <div className="flex gap-2">
        {items.map((item, index) => {
          const IconComponent = item.imageSource

          return (
            <button
              key={index}
              className={`flex items-center rounded-full p-1 text-xs font-semibold ${
                activeItem === index
                  ? "bg-orange-100 text-orange-800"
                  : "text-lilac-900 bg-gray-200"
              }`}
              onClick={() => handleClick(index)}
            >
              <IconComponent
                className="size-4"
                color={activeItem == index ? "#fa4808" : "#616375"}
              />
              <span className="px-1">{item.buttonTitle}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterItemContainer
