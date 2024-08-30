import { Link } from "react-router-dom"

export function ContainerStatus({ containerIcon, content, title }) {
  return (
    <Link
      to="/"
      className="flex w-full flex-col items-center justify-center rounded-xl bg-gray-200 p-3 text-center"
    >
      {containerIcon}
      <p className="text-base font-semibold text-orange-600">{content}</p>
      <p className="text-sm text-zinc-400">{title}</p>
    </Link>
  )
}
