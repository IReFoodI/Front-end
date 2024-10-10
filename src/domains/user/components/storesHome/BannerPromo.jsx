export function BannerPromo({ title }) {
  return (
    <div className="top-[889px] my-4 flex h-[300px] items-center justify-center rounded-[14px] bg-[#FFCBCB] p-4">
      <h1 className="font-inter text-center text-[24px] font-semibold leading-[29px] text-[#616375]">
        {title}
      </h1>
    </div>
  )
}
