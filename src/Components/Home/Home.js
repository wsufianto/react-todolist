import React from 'react'
import { Link } from 'react-router-dom'
import { country } from '../../Helpers/CountryCode.js'

const Home = () => {

  return (
    <div className="container mx-auto my-10 text-3xl text-white text-center">
      <h1 className="text-3xl py-10">Please select the country</h1>
      <div className="grid justify-center items-center grid-flow-row grid-cols-4 grid-rows-11 lg:grid-cols-9 lg:grid-rows-6 gap-8">
        {Object.entries(country).map(([key,value]) => {
          return (
              <Link to={`/news/${key}`} key={key}>
                <div className="border-2 p-2 rounded-xl hover:bg-blue-100 hover:text-blue-500 hover:border-blue-400 text-base">{value}</div>
              </Link>
          )  
        })}
      </div>
    </div>
  )
}

export default Home