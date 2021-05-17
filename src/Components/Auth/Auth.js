import React, { useState, useContext } from 'react'
import { useGoogleLogin } from 'react-google-login'
import { AuthContext } from '../../App' // import authentication context
import { useHistory, Link } from 'react-router-dom'
import Input from '../Input/Input'
import { signin, signup } from '../../Helpers/AuthActions'
require('dotenv').config()

const Auth = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cfmPassword: '',
  })
  const [signedUp, setSignedUp] = useState(false)
  const { dispatch } = useContext(AuthContext)
  const history = useHistory()
  const clientId = process.env.REACT_APP_CLIENT_ID

  const clearForm = () => {
    setFormData({
      ...formData,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cfmPassword: '',
    })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleSignedUp = (e) => {
    e.preventDefault()
    clearForm()
    setSignedUp(prevSignedUp => !signedUp)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(signedUp) {
      signup({
        dispatch,
        payload: {formData, history}
      })
    } else {
      signin({
        dispatch,
        payload: {formData, history}
      })
    }
    clearForm()
  }

  const onSuccess = async googleData => {
    const resultData = await googleData

    const result = { 
      firstName: resultData.profileObj.givenName,
      lastName: resultData.profileObj.familyName,
      email: resultData.profileObj.email,
      _id: resultData.profileObj.googleId,
    }

    const token = resultData.tokenId

    try {
      dispatch({ type: 'LOGIN', payload: { result, token } })

      history.push(`/`)
    } catch (error) {
      console.log(error)
    }
  }

  const onFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later!")
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
        name="loginform"
        onSubmit={handleSubmit}
      >
        {signedUp ?
          <>
            <Input
              label="First Name"
              autoFocus="autoFocus"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              handleChange={handleChange}
              required="required"
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              handleChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              handleChange={handleChange}
              required="required"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="**************"
              value={formData.password}
              handleChange={handleChange}
              required="required"
            />
            <Input
              label="Confirm Password"
              name="cfmPassword"
              type="password"
              placeholder="**************"
              value={formData.cfmPassword}
              handleChange={handleChange}
              required="required"
            />
          </>
          :
          <>
            <Input
              label="Email"
              autoFocus="autoFocus"
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              handleChange={handleChange}
              required="required"
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="**************"
              value={formData.password}
              handleChange={handleChange}
              required="required"
            />
          </>
        }
        <div className="flex items-center justify-between">
          <button className="w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {signedUp ? `Sign Up` : `Sign In`}
          </button>
          <div className="w-1/2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            <Link to="#">
              {!signedUp && `Forgot Password?`}
            </Link>
          </div>
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
