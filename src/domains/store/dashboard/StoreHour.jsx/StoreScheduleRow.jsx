import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { scheduleSchema } from "@/domains/store/models/ScheduleSchemaTypes"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"
import { Switch } from "@/ui/components/ui/switch"

export function ScheduleRow({
  dayName,
  enabled,
  disabled,
  onToggleEnabled,
  startHour,
  startMinute,
  endHour,
  endMinute,
  onError,
  onUpdate,
}) {
  const form = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      startHour: startHour || "",
      startMinute: startMinute || "",
      endHour: endHour || "",
      endMinute: endMinute || "",
    },
    mode: "onChange",
  })

  const onSubmit = (data) => {
    onUpdate(data)
  }

  const handleValidation = async () => {
    const isValid = await form.trigger()
    if (!isValid) {
      onError?.(form.formState.errors) // Envia erros para o componente pai
    } else {
      onError?.(null) // Reseta erro se a validação for bem-sucedida
    }
  }

  const handleHourChange = (field) => async (event) => {
    const value = event.target.value
    if (/^(2[0-3]|[0-1]?[0-9]?)?$/.test(value)) {
      field.onChange(value)
      await handleValidation()
      onSubmit(form.getValues())
    }
  }

  const handleMinuteChange = (field) => async (event) => {
    const value = event.target.value
    if (/^(5[0-9]|[0-4]?[0-9]?)?$/.test(value)) {
      field.onChange(value)
      await handleValidation()
      onSubmit(form.getValues())
    }
  }

  return (
    <div
      className={`flex flex-col items-center space-y-2 border-b border-gray-300 py-2 sm:flex-row sm:space-x-4 sm:space-y-0 ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center">
        <Switch
          checked={enabled}
          onCheckedChange={onToggleEnabled}
          disabled={disabled}
          className="mr-2"
        />
        <span
          className={`text-center font-semibold ${disabled ? "text-gray-400" : "text-gray-700"} min-w-[120px] flex-grow`}
        >
          {dayName}
        </span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex items-center justify-center space-x-1">
            <div className="flex items-center space-x-1">
              <FormField
                control={form.control}
                name="startHour"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        maxLength={2}
                        placeholder="00"
                        disabled={disabled || !enabled}
                        className="w-12 rounded-md border text-center"
                        onChange={handleHourChange(field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span>:</span>
              <FormField
                control={form.control}
                name="startMinute"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        maxLength={2}
                        placeholder="00"
                        disabled={disabled || !enabled}
                        className="w-12 rounded-md border text-center"
                        onChange={handleMinuteChange(field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <span
              className={`mx-2 ${disabled ? "text-gray-400" : "text-gray-500"}`}
            >
              até
            </span>
            <div className="flex items-center space-x-1">
              <FormField
                control={form.control}
                name="endHour"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        maxLength={2}
                        placeholder="00"
                        disabled={disabled || !enabled}
                        className="w-12 rounded-md border text-center"
                        onChange={handleHourChange(field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span>:</span>
              <FormField
                control={form.control}
                name="endMinute"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        maxLength={2}
                        placeholder="00"
                        disabled={disabled || !enabled}
                        className="w-12 rounded-md border text-center"
                        onChange={handleMinuteChange(field)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
