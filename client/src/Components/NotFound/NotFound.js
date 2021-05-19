import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex mx-auto flex-col max-w-3xl h-3/4 justify-center items-center my-8 text-white">
      <h2 className="text-3xl py-5 font-bold"> Page not found </h2>
      <p className="text-xl"> Return to <Link to="/"> <span className="underline hover:text-blue-600">Home ...</span></Link></p>
    </div>
  )
}

export default NotFound
