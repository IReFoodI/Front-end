import { Link } from "react-router-dom"

export function ContainerStatus({ containerIcon, content, title, linkTo }) {
  return (
    <Link
      to={linkTo}
      className="flex w-full flex-col items-center justify-center rounded-xl bg-secondary p-2 text-center hover:bg-[#ffeae4]"
    >
      {containerIcon}
      <p className="text-base font-semibold text-primary">{content}</p>
      <p className="text-start text-sm">{title}</p>
    </Link>
  )
}
