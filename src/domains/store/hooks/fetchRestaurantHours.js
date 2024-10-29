import axios from "axios"

export const fetchRestaurantHours = (restaurantId) => {
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
  if (data.id) {
    return axios.put(
      `http://localhost:8080/api/restaurant-hours/${data.id}`,
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
  } else {
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
