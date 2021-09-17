import React from 'react'

const Button = ({ type, value, onClick }) => {
  return (
    <>
      <input type={ type } value={ value } onClick={ onClick }/>
    </>
)}

export default Button