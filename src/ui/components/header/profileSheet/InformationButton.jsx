import { Link } from "react-router-dom"
import { IconCaretRightFilled, IconTrendingUp2 } from "@tabler/icons-react"
import { useState } from "react"

export function InformationButton({ iconForButton, buttonText, path }) {
    const [isActive, setIsActive] = useState(false)

    return (
        <Link to={path} className={`flex items-center justify-between p-2 rounded-xl ${isActive ? `bg-orange-100 text-orange-700` : `bg-gray-200 text-neutral-600`}`} onClick={() => setIsActive(!isActive)}>
            <div className="flex items-center gap-1">
              {iconForButton}
              <p className="text-sm">{buttonText}</p>
            </div>
            <IconCaretRightFilled size={14}/>
        </Link>
    )
}