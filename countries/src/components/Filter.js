import React from 'react'

const Filter = ({filterFormData: {searchTerm, handleSearchTextInput}}) => {
  return (
    <div>
        find countries <input value={searchTerm} onChange={handleSearchTextInput} />
    </div>
)}
export default Filter