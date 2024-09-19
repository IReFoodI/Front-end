import { Link } from "react-router-dom"

export function ContainerStatus({ containerIcon, content, title }) {
  return (
    <Link
      to="/"
      className="flex w-full flex-col items-center justify-center rounded-xl bg-gray-200 p-2 text-center hover:bg-orange-100"
    >
      {containerIcon}
      <p className="text-base font-semibold text-orange-700">{content}</p>
      <p className="text-sm text-zinc-400">{title}</p>
    </Link>
  )
}
