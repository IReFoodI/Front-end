import { Label } from "@radix-ui/react-label"

export function BasicUserInfo({ label, data }) {
  return (
    <div className="mt-4 flex w-full flex-col rounded-xl lg:bg-gray-50">
      <Label className="text-semibold bottom-3 left-3 text-xs text-gray-400 lg:relative lg:text-base lg:font-semibold lg:text-black">
        {label}
      </Label>
      <p className="bottom-3 text-lg font-semibold text-black lg:relative lg:mx-1 lg:p-1 lg:font-medium lg:text-gray-500">
        {data}
      </p>
    </div>
  )
}
