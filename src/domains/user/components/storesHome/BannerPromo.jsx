export function BannerPromo({ title }) {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-[14px] bg-[#fde4dd] p-4">
      <h1 className="text-center font-inter text-[24px] font-semibold leading-[29px] text-gray-500">
        {title}
      </h1>
    </div>
  )
}
