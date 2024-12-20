import { forwardRef } from "react"
import { PatternFormat } from "react-number-format"

export const CepPatternFormat = forwardRef(({ onChange, ...props }, ref) => (
  <PatternFormat
    format="#####-###"
    allowEmptyFormatting
    mask="_"
    getInputRef={ref}
    onValueChange={(values) => {
      onChange({ target: { value: values.value } })
    }}
    className={`w-full rounded-md border-2 border-input p-4 h-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
    {...props}
  />
))

CepPatternFormat.displayName = "CepPatternFormat"
