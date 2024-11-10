import { cn } from "@/app/utils/cn"

export function SliderMetric({ initialValue, currentValue, finalValue, step }) {
  const values = [
    initialValue,
    initialValue + step,
    initialValue + step * 2,
    initialValue + step * 3,
    initialValue + step * 4,
  ]

  return (
    <div className="flex justify-between text-sm">
      {values.map((value, index) => (
        <div className="flex flex-1" key={index}>
          <div
            className={`flex flex-col items-center justify-center ${currentValue[0] === value ? `text-primary` : `text-gray-300`} mx-1`}
          >
            <span
              className={cn(
                `h-3 border`,
                currentValue[0] === value ? `border-primary` : `border-gray-300`
              )}
            ></span>
            <div
              className={`${
                currentValue[0] === value ? `text-primary` : `text-gray-300`
              }`}
            >
              {value}
            </div>
          </div>
          <div className="flex flex-1 items-start justify-center">
            <span
              className={`flex h-2 border ${currentValue[0] === value + 10 ? `border-primary` : `border-gray-100`} `}
            ></span>
          </div>
        </div>
      ))}

      <div
        className={`flex flex-col items-center justify-center ${currentValue[0] == finalValue ? `border-primary` : `border-gray-400`}`}
      >
        <span
          className={`h-3 border ${currentValue[0] === finalValue ? `border-primary` : `border-gray-300`}`}
        ></span>
        <div
          className={
            currentValue[0] === finalValue ? `text-primary` : `text-gray-300`
          }
        >
          {finalValue}+
        </div>
      </div>
    </div>
  )
}
