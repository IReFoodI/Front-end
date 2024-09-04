import { Decorative } from "./components/Decorative"
import { PresentationContent } from "./components/PresentationContent"

export function LoginPresentation() {
  return (
    <div className="grid h-screen content-center p-3 sm:grid-cols-2 lg:px-0">
      <Decorative className={"hidden"} />
      <PresentationContent />
    </div>
  )
}
