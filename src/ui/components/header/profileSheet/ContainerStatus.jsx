export function ContainerStatus({ containerIcon, content, title }) {
  console.log(containerIcon)
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl bg-zinc-200 p-3 text-center">
      {containerIcon}
      <p className="text-base font-semibold text-orange-600">{content}</p>
      <p className="text-sm text-zinc-400">{title}</p>
    </div>
  )
}
