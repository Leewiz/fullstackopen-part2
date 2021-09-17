import React from 'react'
const COMPASS_DIRECTIONS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
const COMPASS_DEGREES = 360
const getDirection = (degrees) => {
  const incrementSize = COMPASS_DEGREES / COMPASS_DIRECTIONS.length
  const normalized = degrees >= 360 ? degrees - 360 : degrees
  const direction = Math.floor((normalized / incrementSize) + 0.5)
  return COMPASS_DIRECTIONS[direction]
}

const Weather = ({ weatherData }) => {  
  return (
    <div>
      <h3>Weather in { weatherData.name }</h3>
      <b>temperature:</b> { weatherData.main.temp } fahrenheit<br />
      <b>wind:</b> { weatherData.wind.speed } mph { getDirection(weatherData.wind.deg) }
    </div>
  )
}
export default Weather