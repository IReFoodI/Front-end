export function BannerPromo({ title }) {
  return (
    <div className="flex min-h-52 items-center justify-center rounded-[14px] bg-[#FFCBCB] p-4">
      <h1 className="text-center font-inter text-[24px] font-semibold leading-[29px] text-[#616375]">
        {title}
      </h1>
    </div>
  )
}
