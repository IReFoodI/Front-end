import { IconCaretRightFilled } from "@tabler/icons-react"

export function InformationButton({
  ownIndex,
  iconForButton,
  buttonText,
  currentIndex,
  setCurrentIndex,
}) {
  return (
    <li
      className={`flex cursor-pointer items-center justify-between rounded-xl p-2 hover:bg-[#ffeae4] hover:text-primary ${currentIndex === ownIndex ? `bg-[#ffeae4] text-primary` : `bg-gray-200 text-gray-600`}`}
      onClick={setCurrentIndex}
    >
      <div className="flex items-center gap-1">
        {iconForButton}
        <p className="text-sm">{buttonText}</p>
      </div>
      <IconCaretRightFilled size={14} />
    </li>
  )
}
