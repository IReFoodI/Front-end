function SliderMetric({ initialValue, currentValue, finalValue, step }) {
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
        <div className="flex" key={index}>
          <div
            className={`flex flex-col items-center justify-center ${currentValue == value ? `text-orange-700` : `text-zinc-200`} mx-1`}
          >
            <span
              className={`m-1 h-full border-l ${currentValue == value ? `border-orange-700` : `border-zinc-200`}`}
            ></span>
            <div
              className={
                currentValue == value ? `text-orange-700` : `text-zinc-100`
              }
            >
              {value}
            </div>
          </div>
          <span
            className={`mx-3 h-full ${currentValue == value + 10 ? `text-orange-700` : `text-zinc-200`} `}
          >
            I
          </span>
        </div>
      ))}

      <div
        className={`flex flex-col items-center justify-center ${currentValue == finalValue ? `text-orange-700` : `text-zinc-200`}`}
      >
        <span>I</span>
        <div
          className={
            currentValue == finalValue ? `text-orange-700` : `text-zinc-200`
          }
        >
          {finalValue}
        </div>
      </div>
    </div>
  )
}

export default SliderMetric
