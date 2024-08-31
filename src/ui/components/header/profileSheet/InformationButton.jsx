import { IconCaretRightFilled } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export function InformationButton({ iconForButton, buttonText, path }) {
  const [isActive, setIsActive] = useState(false)

  return (
    <Link
      to={path}
      className={`flex items-center justify-between rounded-xl p-2 hover:bg-orange-100 hover:text-orange-700 ${isActive ? `bg-orange-100 text-orange-700` : `bg-gray-200 text-neutral-600`}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex items-center gap-1">
        {iconForButton}
        <p className="text-sm">{buttonText}</p>
      </div>
      <IconCaretRightFilled size={14} />
    </Link>
  )
}
