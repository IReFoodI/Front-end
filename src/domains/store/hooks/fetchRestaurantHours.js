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
