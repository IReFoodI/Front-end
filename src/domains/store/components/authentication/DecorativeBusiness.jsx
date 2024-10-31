import logo from "@/ui/assets/Logo-Negocios.png"

export function DecorativeBusiness() {
  return (
    <div className="relative z-50 m-auto hidden max-w-md text-start sm:m-0 lg:block">
      <h1 className="mb-8 text-3xl font-semibold text-white sm:text-5xl">
        Seu negócio com <span className="font-bold">agilidade na gestão.</span>
      </h1>
      <div className="sm:w-auto md:justify-start">
        <img src={logo} className="w-36 sm:w-44" alt="logo refood" />
      </div>
    </div>
  )
}
