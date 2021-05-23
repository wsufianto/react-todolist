import React from 'react'
import { Link } from 'react-router-dom'
import { country } from '../../Helpers/CountryCode.js'

const Home = () => {

  return (
    <div className="container mx-auto md:my-10 text-3xl text-white text-center">
      <h1 className="text-2xl sm:text-3xl py-10">Please select the country</h1>
      <div className="grid justify-center items-center grid-flow-row grid-cols-2 grid-rows-16 md:grid-cols-5 md:grid-rows-10 xl:grid-cols-9 xl:grid-rows-6 gap-3 lg:gap-6 px-2 lg:px-0">
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