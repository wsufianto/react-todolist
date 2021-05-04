import React, { useRef, useState, useEffect } from 'react'
import { useGoogleLogin } from 'react-google-login'
require('dotenv').config();

const inputStyle = `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`

const Auth = () => {
  const focusElement = useRef(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cfmPassword, setCfmPassword] = useState('')
  const [signedUp, setSignedUp] = useState(false)

  const clientId = process.env.REACT_APP_CLIENT_ID

  console.log(clientId);

  useEffect(() => {
    if (focusElement.current) {
      focusElement.current.focus()
    }
  }, [signedUp])

  const clearForm = () => {
    console.log("Form Cleared!")
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setCfmPassword('')
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setCfmPassword(e.target.value)
  }

  const toggleSignedUp = (e) => {
    e.preventDefault()
    clearForm()
    setSignedUp(prevSignedUp => !signedUp)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(
      firstName + " " + lastName + " " + email + " " + password + " " + cfmPassword
    )
    e.target.reset()
  }

  const onSuccess = async googleData => {
    // console.log(res)
    // console.log(res.profileObj)

    const res = await fetch("/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId
        }),
      headers: {
        "Content-Type": "application/json"
        }
      })
    
      const data = await res.json()
      console.log(data)
    // store returned user somehow
  }
  
  
  const onFailure = (res) => {
    console.log(res)
  }

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
  })

  return (
    <div className="w-full mx-auto mt-8 max-w-sm">
      <form 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {signedUp ? 
          <>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
              First Name
            </label>
            <input 
              ref={focusElement}
              className={inputStyle} 
              id="firstname" 
              type="text" 
              placeholder="First Name" 
              value={firstName}
              onChange={handleFirstNameChange}
              required 
              />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
              Last Name
            </label>
            <input 
              className={inputStyle} 
              id="lastname" 
              type="text" 
              placeholder="Last Name" 
              value={lastName}
              onChange={handleLastNameChange}
              required 
            />
          </div>
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailAdd">
              Email Address
            </label>
            <input 
              className={inputStyle} 
              id="emailAdd" 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={handleEmailChange}
              required />
          </div>
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className={inputStyle} 
              id="password" 
              type="password" 
              placeholder="******************" 
              value={password}
              onChange={handlePasswordChange}
              required />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div className="mb-6">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cfmpassword">
              Confirm Password
            </label>
            <input 
              className={inputStyle}
              id="cfmpassword" 
              type="password" 
              placeholder="******************"
              value={cfmPassword} 
              onChange={handleConfirmPassword}
              required />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          </>
          : 
          <>
          <div className="mb-4">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailAdd">
              Email Address
            </label>
            <input 
              ref={focusElement}
              className={inputStyle} 
              id="emailAdd" 
              type="email" 
              placeholder="Email Address"
              value={email}
              onChange={handleEmailChange}
              required 
              />
          </div>
          <div className="mb-6">
            <label 
              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className={inputStyle} 
              id="password" 
              type="password" 
              placeholder="******************" 
              value={password}
              onChange={handlePasswordChange}
              required />
            {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div> 
          </>
        }
        <div className="flex items-center justify-between">
          <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {signedUp ? `Sign Up` : `Sign In`}
          </button>
          <a className="w-1/2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            {!signedUp && `Forgot Password?` }
          </a>
        </div>
        {!signedUp && <div className="flex items-center justify-between py-2">
          <button 
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            onClick={signIn}
          >
            Login with Google
          </button>
        </div>
        }
        <button 
          className="text-blue-500 font-bold py-3 text-xs focus:outline-none"
          onClick={toggleSignedUp}> {signedUp ? `Have account? Sign in here.` : `No Account Yet? Sign up here.`}
        </button>
      </form>
    </div>
  )
}

export default Auth
