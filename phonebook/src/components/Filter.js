import React from 'react'

const Filter = ({filterFormData: {searchTerm, onSearchTextChange}}) => {
  return (
    <div>
        filter shown with <input value={searchTerm} onChange={onSearchTextChange} />
    </div>
)}
export default Filter