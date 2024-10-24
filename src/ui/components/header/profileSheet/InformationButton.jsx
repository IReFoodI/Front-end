import { IconCaretRightFilled } from "@tabler/icons-react"
import { Link } from "react-router-dom"
//
export function InformationButton({
  ownIndex,
  iconForButton,
  buttonText,
  path,
  currentIndex,
  setCurrentIndex,
}) {
  return (
    <Link
      to={path}
      className={`flex items-center justify-between rounded-xl p-2 hover:bg-[#ffeae4] hover:text-primary ${currentIndex == ownIndex ? `bg-orange-100 text-primary` : `bg-gray-200 text-gray-600`}`}
      onClick={() => setCurrentIndex(ownIndex)}
    >
      <div className="flex items-center gap-1">
        {iconForButton}
        <p className="text-sm">{buttonText}</p>
      </div>
      <IconCaretRightFilled size={14} />
    </Link>
  )
}
