import { Link } from "react-router-dom"

export function ContainerStatus({ containerIcon, content, title }) {
  return (
    <Link
      to="/"
      className="flex w-full flex-col items-center justify-center rounded-xl bg-gray-50 p-2 text-center hover:bg-[#ffeae4]"
    >
      {containerIcon}
      <p className="text-base font-semibold text-primary">{content}</p>
      <p className="text-start text-sm">{title}</p>
    </Link>
  )
}
