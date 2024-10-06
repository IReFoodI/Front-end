import imageDecorative from "../../../../ui/assets/decorative_image.svg"

export function Decorative({ className }) {
  return (
    <>
      <div
        className={`${className} relative p-5 sm:flex sm:max-h-[25.625rem] sm:justify-center md:py-8 md:pl-28 md:pr-24`}
      >
        <img
          className="relative z-10"
          src={imageDecorative}
          alt="imagem decorativa padrão"
        />
        <div className="sm:rou absolute left-4 top-11 h-5/6 w-11/12 rounded-3xl bg-primary/10 sm:left-0 sm:top-0 sm:h-full sm:w-full sm:rounded-e-3xl sm:rounded-s-none"></div>
      </div>
    </>
  )
}