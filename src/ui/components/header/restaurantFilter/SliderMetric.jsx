export function SliderMetric({ initialValue, currentValue, finalValue, step }) {
  const values = [
    initialValue,
    initialValue + step,
    initialValue + step * 2,
    initialValue + step * 3,
    initialValue + step * 4,
  ]
  //
  return (
    <div className="flex justify-between text-sm">
      {values.map((value, index) => (
        <div className="flex" key={index}>
          <div
            className={`flex flex-col items-center justify-center ${currentValue == value ? `text-orange-700` : `text-gray-300`} mx-1`}
          >
            <span
              className={`h-3 border ${currentValue == value ? `border-orange-700` : `border-gray-300`}`}
            ></span>
            <div
              className={`${
                currentValue == value ? `text-orange-700` : `text-gray-300`
              }`}
            >
              {value}
            </div>
          </div>
          <span
            className={`mx-3 h-2 border ${currentValue == value + 10 ? `border-orange-700` : `border-gray-100`} `}
          ></span>
        </div>
      ))}

      <div
        className={`flex flex-col items-center justify-center ${currentValue == finalValue ? `text-orange-700` : `text-gray-400`}`}
      >
        <span
          className={`h-3 border ${currentValue == finalValue ? `border-orange-700` : `border-gray-300`}`}
        ></span>
        <div
          className={
            currentValue == finalValue ? `text-orange-700` : `text-gray-300`
          }
        >
          {finalValue}+
        </div>
      </div>
    </div>
  )
}
