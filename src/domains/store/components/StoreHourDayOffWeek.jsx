import { useMemo } from "react"

export function StoreHourDayOfWeek({ restaurantHoursTodayData }) {
  const todayData = useMemo(() => {
    const today = new Date()
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase()
    return restaurantHoursTodayData?.find((item) => item.dayOfWeek === today)
  }, [restaurantHoursTodayData])

  return todayData && todayData ? (
    <>
      <span>Hoje </span>
      <span>
        {todayData.openingTime}h - {todayData.closingTime}h
      </span>
    </>
  ) : null
}
