export default function PageLayout({ children, headerText }) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="fixed left-0 top-0 z-10 flex w-full items-center justify-center bg-[#fedede] sm:h-1/4 lg:h-1/6">
        <p className="text-center text-2xl font-bold">{headerText}</p>
      </div>
      <div className="w-11/12 sm:pt-[30vh] lg:w-10/12 lg:pt-[20vh]">
        {children}
      </div>
    </div>
  )
}
