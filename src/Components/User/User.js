import React, { useState } from 'react'
import axios from 'axios'

const User = () => {
  const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [message, setMessage] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value)
  // }

  // const handleMessageChange = (e) => {
  //   setMessage(e.target.value)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(name + " " + email + " " + message)

    const user = {
      username: name
    }

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data))

    setName('')
    // setEmail('')
    // setMessage('')
  }


  return (
    <form
      className="flex flex-col border-4 h-3/4 justify-start rounded-lg p-10 gap-y-8 mx-auto max-w-3xl mt-12"
      onSubmit={handleSubmit}>
      <label
        htmlFor="name"
        className="text-white"
        >
          Name :
      </label>
      <input
        className="p-2 rounded-md outline-none"
        type="text"
        value={name}
        onChange={handleNameChange}
        required
        />
      {/* <label 
        htmlFor="email"
        className="text-white"
      >  
          Email :
      </label>
      <input 
        className="p-2 rounded-md outline-none" 
        type="email" 
        value={email} 
        onChange={handleEmailChange} 
        required 
      />
      <label 
        htmlFor="message"
        className="text-white"
      >  
          Message :
      </label>
      <textarea 
        className="p-2 rounded-md outline-none" 
        rows="5"
        value={message} 
        onChange={handleMessageChange} 
      /> */}
      <button 
        className="rounded-lg p-3 text-blue-600 bg-white w-1/2 self-center outline-none" 
        type="submit"> 
        Submit 
      </button>
    </form>
  )
}

export default User
