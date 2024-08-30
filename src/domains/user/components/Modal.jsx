/* eslint-disable react/prop-types */
export function Modal({
  title = "Tem certeza que quer fazer isso?",
  body = "",
  type = "orange",
  buttonText = "Continue",
  onClose,
}) {
  const buttonColors = {
    blue: "bg-blue-500 hover:bg-blue-700 text-white",
    red: "bg-red-500 hover:bg-red-700 text-white",
    green: "bg-green-500 hover:bg-green-700 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-700 text-black",
    orange: "bg-orange-500 hover:bg-orange-700 text-white",
  }

  const buttonClass = buttonColors[type] || buttonColors.orange

  return (
    <div className="absolute left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/70">
      <div className="relative w-4/5 max-w-[500px] rounded-lg bg-white p-8 px-10 text-center">
        <button
          className="absolute right-5 top-2 text-4xl hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h1 className="mb-4 text-2xl font-semibold">{title}</h1>
        <p className="mb-6 text-sm">{body}</p>
        <button className={`w-full rounded-full px-4 py-2 ${buttonClass}`}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}
