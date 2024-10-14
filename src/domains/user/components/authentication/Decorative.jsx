import imageDecorative from "../../../../ui/assets/decorative_image.svg"

export function Decorative({ className }) {
  return (
    <div
      className={`${className} fixed p-5 sm:flex sm:max-w-full sm:justify-end md:pr-9`}
    >
      <img
        className="relative z-10"
        src={imageDecorative}
        alt="imagem decorativa padrão"
      />
      <div className="absolute left-4 top-11 h-5/6 w-11/12 rounded-3xl bg-primary/10 sm:left-0 sm:top-0 sm:h-full sm:w-full sm:rounded-e-3xl sm:rounded-s-none"></div>
    </div>
  )
}
