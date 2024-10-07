import { Switch } from "@/ui/components/ui/switch"

export function ScheduleRow({
  dayName,
  enabled,
  startHour,
  startMinute,
  endHour,
  endMinute,
  disabled,
  onToggleEnabled,
  onStartHourChange,
  onStartMinuteChange,
  onEndHourChange,
  onEndMinuteChange,
}) {
  const handleHourInput = (value, setValue) => {
    if (
      /^\d{0,2}$/.test(value) &&
      (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 23))
    ) {
      setValue(value)
    }
  }

  const handleMinuteInput = (value, setValue) => {
    if (
      /^\d{0,2}$/.test(value) &&
      (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 59))
    ) {
      setValue(value)
    }
  }

  const formatWithLeadingZero = (value, setValue) => {
    if (value.length === 1) {
      setValue("0" + value)
    } else if (value === "") {
      setValue("00")
    }
  }

  return (
    <div
      className={`flex items-center space-x-4 border-b border-gray-300 py-2 ${disabled ? "opacity-50" : ""} flex-nowrap`}
    >
      <Switch
        checked={enabled}
        onCheckedChange={onToggleEnabled}
        disabled={disabled}
        className="mr-2"
      />
      <span
        className={`font-semibold ${disabled ? "text-gray-400" : "text-gray-700"} min-w-[120px] flex-grow`}
      >
        {dayName}
      </span>
      <span className={`mr-2 ${disabled ? "text-gray-400" : "text-gray-500"}`}>
        das
      </span>
      <div className="flex items-center space-x-1">
        <input
          type="text"
          value={startHour}
          onChange={(e) => handleHourInput(e.target.value, onStartHourChange)}
          onBlur={() => formatWithLeadingZero(startHour, onStartHourChange)}
          className="w-12 rounded-md border text-center"
          maxLength={2}
          placeholder="00"
          disabled={disabled || !enabled}
        />
        <span>:</span>
        <input
          type="text"
          value={startMinute}
          onChange={(e) =>
            handleMinuteInput(e.target.value, onStartMinuteChange)
          }
          onBlur={() => formatWithLeadingZero(startMinute, onStartMinuteChange)}
          className="w-12 rounded-md border text-center"
          maxLength={2}
          placeholder="00"
          disabled={disabled || !enabled}
        />
      </div>
      <span className={`mx-2 ${disabled ? "text-gray-400" : "text-gray-500"}`}>
        até
      </span>
      <div className="flex items-center space-x-1">
        <input
          type="text"
          value={endHour}
          onChange={(e) => handleHourInput(e.target.value, onEndHourChange)}
          onBlur={() => formatWithLeadingZero(endHour, onEndHourChange)}
          className="w-12 rounded-md border text-center"
          maxLength={2}
          placeholder="00"
          disabled={disabled || !enabled}
        />
        <span>:</span>
        <input
          type="text"
          value={endMinute}
          onChange={(e) => handleMinuteInput(e.target.value, onEndMinuteChange)}
          onBlur={() => formatWithLeadingZero(endMinute, onEndMinuteChange)}
          className="w-12 rounded-md border text-center"
          maxLength={2}
          placeholder="00"
          disabled={disabled || !enabled}
        />
      </div>
    </div>
  )
}
