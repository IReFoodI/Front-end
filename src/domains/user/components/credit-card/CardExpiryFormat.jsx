import { NumberFormatBase, usePatternFormat } from "react-number-format"

export function CardExpiryFormat(props) {
  const { format, ...rest } = usePatternFormat({
    ...props,
    format: "##/##",
  })

  const _format = (val) => {
    let month = val.substring(0, 2)
    const year = val.substring(2, 4)

    if (month.length === 1 && month[0] > 1) {
      month = `0${month[0]}`
    } else if (month.length === 2) {
      // set the lower and upper boundary
      if (Number(month) === 0) {
        month = `01`
      } else if (Number(month) > 12) {
        month = "12"
      }
    }

    return format(`${month}${year}`)
  }

  return <NumberFormatBase format={_format} {...rest} />
}
