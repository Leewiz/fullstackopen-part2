import React, { useState, useEffect } from 'react'
import PhonebookService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ notification, setNotification ] = useState('')

  const defaultNotification = {
    type: 'none',
    message: 'default',
  }

  useEffect(() => {
    PhonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
    setNotification(defaultNotification)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const duplicateExists = (person) => persons.find(p => p.name === person.name)

  const notify = (type, message, timeout) => {
    const newNotification = { type, message }
    setNotification(newNotification)
    setTimeout(() => {
      setNotification(defaultNotification)
    }, timeout)
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = duplicateExists(personObject)
    if(existingPerson) {
      if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        PhonebookService.update(existingPerson.id, personObject)
        .then(returnedPerson => {
          personObject['id'] = returnedPerson.id
          notify('success', `updated ${returnedPerson.name}'s number'`)
          setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
        })
        .catch(error => {
          notify('error', `information for ${existingPerson.name} has already been removed from server`, 5000)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
          console.log(error)
        })
      }
    }
    else {
      PhonebookService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notify('success', `added ${personObject.name} to phonebook`, 5000)
      })
    }
  }

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if(personToDelete && window.confirm(`Delete ${personToDelete.name}`)) {
      PhonebookService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => id !== person.id))
        notify('success', `deleted ${personToDelete.name}`, 5000)
      })
      .catch(error => {
        console.log(error)
        notify('error', `error deleting ${personToDelete.name}: ${error}`, 5000)
      })
    }
  }

  const handleTextChangeEvent = (setterCallback, event) => {
    setterCallback(event.target.value)
  }

  const filterFormData = {
    searchTerm: searchTerm,
    onSearchTextChange: (event) => handleTextChangeEvent(setSearchTerm, event)
  }

  const personFormData = {
    newName: newName,
    newNumber: newNumber,
    handleAddPerson: handleAddPerson,
    onNameTextChange: (event) => handleTextChangeEvent(setNewName, event),
    onNumberTextChange: (event) => handleTextChangeEvent(setNewNumber, event)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification notification={ notification } />

      <Filter filterFormData={ filterFormData }/>

      <h3>add new</h3>

      <PersonForm personFormData={ personFormData }/>

      <h3>Numbers</h3>
      
      <Persons handleDeletePerson={ handleDeletePerson } persons={persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())) }/>
    </div>
  )
}

export default App