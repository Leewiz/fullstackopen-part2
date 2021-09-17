import React from 'react'
import Person from './Person'
import Button from './Button'

const Persons = ({ persons, handleDeletePerson }) => {
  return (
    <div>
      {
        persons.map(person =>
          <div key={person.id}>
            <Person key={ person.name } name={ person.name } number={ person.number } />
            <Button key={ person.number } onClick={ () => handleDeletePerson(person.id) } type='button' value='delete' /><br />
          </div>
      )}
    </div>
)}

export default Persons