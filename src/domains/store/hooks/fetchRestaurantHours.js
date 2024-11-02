import axios from "axios"

export const fetchRestaurantHours = (restaurantId) => {
  console.log(restaurantId)
  return axios.get(
    `http://localhost:8080/api/restaurant-hours/restaurant/${restaurantId}`,
    {
      headers: {
        accept: "*/*",
      },
    }
  )
}

export const addRestaurantHours = (data) => {
  console.log(data)
  if (data.id) {
    if (data.enabled) {
      return axios.put(
        `http://localhost:8080/api/restaurant-hours/${data.id}`,
        {
          dayOfWeek: data.dayOfWeek,
          openingTime: data.openingTime,
          closingTime: data.closingTime,
          restaurantId: data.restaurantId,
          enabled: data.enabled,
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
    } else {
      return axios.delete(
        `http://localhost:8080/api/restaurant-hours/${data.id}`,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
    }
  } else if (data.enabled) {
    return axios.post(
      `http://localhost:8080/api/restaurant-hours`,
      {
        dayOfWeek: data.dayOfWeek,
        openingTime: data.openingTime,
        closingTime: data.closingTime,
        restaurantId: data.restaurantId,
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    )
  }
}
