import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../../App' // import authentication context
import decode from 'jwt-decode'

const Navbar = () => {
  const { dispatch } = React.useContext(AuthContext); // useContext to get reducer dispatch function 
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  
  const history = useHistory()
  const location = useLocation()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push("/")
    setUser(null)
  }

  useEffect(() => {
    
    const token = user?.token

    if(token) {
      const decodedToken = decode(token)
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
    }

    setUser(JSON.parse(localStorage.getItem('user')))
  },[location])

  return (
    <nav className="flex bg-blue-600 h-16 items-center justify-between px-5 text-white">
      <h1 className="text-lg font-bold"> Latest International News </h1>
      <div className="space-x-3">
        <Link to="/" className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100"> Home </Link>
        {user?.result &&
          <Link to={`/user/${user?.result._id}`} className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100"> {user.result.firstName} {user.result.lastName}'s News</Link>
        }
        <Link to="/contact">Contact</Link>
        {user?.result?
          <button className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100" onClick={handleLogout}>Logout</button>
          :
          <Link to="/signin" className="p-2 rounded-xl hover:text-blue-600 hover:bg-blue-100">Sign In</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar
