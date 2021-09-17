import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const app_id = process.env.REACT_APP_API_KEY
  const weatherEndpoint = 'http://api.openweathermap.org/data/2.5/weather'
  const [ countries, setCountries ] = useState([])
  const [ weather, setWeather ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const queryCityWeather = (city) => weatherEndpoint + `?q=${city}&units=imperial&appid=${app_id}`

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    let newWeatherData = []
    countries.forEach((country) => {
      if(country.capital) {
        axios
          .get(queryCityWeather(country.capital))
          .then(response => {
            newWeatherData.push(response.data)
          })
          .catch((error) => {
            console.log('error data', error.response.data)
            console.log('error status', error.response.status)
            console.log('error headers', error.response.headers)
          })
      }
    })
    setWeather(newWeatherData)
  }, [countries])

  const handleSearchTextInput = (event) => {
    console.log('event.target', event.target)
    setSearchTerm(event.target.value)
  }

  const filterFormData = {
    searchTerm: searchTerm, 
    handleSearchTextInput: (event) => handleSearchTextInput(event)
  }

  return (
    <div>
      <Filter filterFormData={ filterFormData } />
      <CountryList showButtonCallback={setSearchTerm} weatherData={weather} countries={ countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))} />
    </div>
  )
}

export default App