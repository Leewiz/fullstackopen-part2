import React from 'react'

const Total = ({ parts }) => {
    const sum = (previousSum, currentPart) => previousSum + currentPart.exercises
  
    return(
      <p>Number of exercises {parts.reduce(sum, 0)}</p>
    ) 
  }

export default Total