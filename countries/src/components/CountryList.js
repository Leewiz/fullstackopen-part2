import React from 'react'
import Country from './Country'

const CountryList = ({countries, weatherData, showButtonCallback }) => {
  let content
  if(countries.length > 10)
    content = 'Too many matches, narrow your search'
  else if(countries.length > 1)
    content = countries.map(country =><div key={country.numericCode}>{country.name}<button onClick={() => showButtonCallback(country.name)}>show</button><br /></div>)
  else if(countries.length === 1) {
    content = countries.map(country => <Country key={country.numericCode} country={ country } weatherData={ weatherData.find(data => data.name.toLowerCase() === country.capital.toLowerCase()) } />)
  }
  return (
    <div>
      {content}
    </div>
)}

export default CountryList