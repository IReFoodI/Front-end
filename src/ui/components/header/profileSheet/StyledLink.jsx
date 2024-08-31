import { Link } from "react-router-dom"

export function StyledLink({ path, text }) {
  return (
    <Link to={path} className="text-sm font-semibold text-orange-600 underline">
      {text}
    </Link>
  )
}
