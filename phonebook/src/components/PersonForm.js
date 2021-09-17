import React from 'react'
import Button from './Button'
const PersonForm = ({ personFormData: { newName, newNumber, handleAddPerson, onNameTextChange, onNumberTextChange }}) => {
  return (
    <div>
      <form onSubmit={ handleAddPerson }>
        <div>
          name: <input value={ newName } onChange={ onNameTextChange } />
        </div>
        <div>
          number: <input value={ newNumber } onChange={ onNumberTextChange } />
        </div>
        <Button type='submit' value='add' />
      </form>
    </div>
)}
export default PersonForm