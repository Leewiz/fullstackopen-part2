import React from 'react'
import Flag from './Flag'
import Weather from './Weather'

const Country = ({country: {name, capital, population, flag, numericCode, languages}, weatherData}) => {
    return (
    <>
      <h1>{name}</h1><br />
      capital {capital}<br />
      population {population}<br />
      <h2>languages</h2>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <Flag key={numericCode} url={flag} /><br />
      <Weather city={capital} weatherData={ weatherData } />
    </>
  ) 
}
export default Country