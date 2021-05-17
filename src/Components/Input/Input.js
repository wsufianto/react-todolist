import React from 'react'

const Input = ({ label, autoFocus, name, type, placeholder, value, handleChange, required }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
        {label}
      </label>
      <input
        autoFocus={autoFocus}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  )
}

export default Input
