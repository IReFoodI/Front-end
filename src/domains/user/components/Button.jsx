/* eslint-disable react/prop-types */
export function Button({
  children,
  color = "bg-orange-500",
  textColor = "text-white",
  hoverColor = "hover:bg-orange-700",
  borderColor = "border-orange-500",
  width = "w-full",
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={`rounded-full px-4 py-3 font-semibold ${color} ${textColor} ${hoverColor} ${borderColor} border-2 transition-colors duration-300 ease-in-out ${width} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
