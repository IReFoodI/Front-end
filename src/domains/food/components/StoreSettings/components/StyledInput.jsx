export function StyledInput({
  isDisabled,
  isTextArea,
  onInputChange,
  inputName,
  inputValue,
  inputPlaceholder,
}) {
  return isTextArea ? (
    <textarea
      name={inputName}
      onChange={(event) => onInputChange(event)}
      className={`w-full rounded-md border border-zinc-400 ${isDisabled ? "bg-slate-200" : "bg-none"} h-32 resize-none p-2 outline-orange-500`}
      placeholder={inputPlaceholder}
      value={inputValue}
    ></textarea>
  ) : (
    <input
      type="text"
      disabled={isDisabled}
      onChange={(event) => onInputChange(event)}
      name={inputName}
      className={`w-full rounded-md border border-zinc-400 ${isDisabled ? "bg-slate-200" : "bg-none"} p-2 outline-orange-500 ${isTextArea ? "h-32" : ""}`}
      value={inputValue}
      placeholder={inputPlaceholder}
    />
  )
}
