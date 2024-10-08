export function StyledInput({
  isDisabled,
  onInputChange,
  inputName,
  inputValue,
  inputPlaceholder,
}) {
  return (
    <input
      type="text"
      disabled={isDisabled}
      onChange={(event) => onInputChange(event)}
      name={inputName}
      className={`w-full rounded-md border border-zinc-400 ${isDisabled ? "bg-slate-200" : "bg-none"} p-2 outline-orange-500`}
      value={inputValue}
      placeholder={inputPlaceholder}
    />
  )
}
