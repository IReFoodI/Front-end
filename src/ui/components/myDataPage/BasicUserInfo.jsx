import { Label } from "@radix-ui/react-label"
import { PatternFormat } from "react-number-format"

export function BasicUserInfo({ label, data }) {
  return (
    <div className="mt-4 flex w-full flex-col rounded-xl lg:bg-secondary">
      <Label className="text-semibold bottom-3 left-3 text-xs text-gray-400 lg:relative lg:text-base lg:font-semibold lg:text-gray-600">
        {label}
      </Label>
      <p className="bottom-3 text-lg font-semibold text-gray-600 lg:relative lg:mx-1 lg:p-1 lg:font-medium lg:text-gray-500">
        {label === "Contato" ? (
          <PatternFormat
            value={data}
            displayType="text"
            format="(##) #####-####"
            allowEmptyFormatting
            mask="_"
          />
        ) : (
          data
        )}
      </p>
    </div>
  )
}
