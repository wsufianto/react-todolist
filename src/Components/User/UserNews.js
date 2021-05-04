import React from 'react'
import useFetch from '../../Helpers/useFetch'
import NewsList from '../NewsItem/NewsList'
import axios from 'axios'

const UserNews = () => {

  const url = 'http://localhost:5000/news/'
  const buttonLabel = (
    <svg
      className="w-6 h-6 text-blue-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  )

  const { data, setData, isLoading, errMessage } = useFetch(url)

  console.log(data)

  const toFind = "Peter Parker"
  const toShow = data.filter(item => item.username === toFind)

  const handleDelete = (id) => {

    // const toDelete = data.filter(item => item.title === id)

    // console.log(toDelete[0]._id)

    // axios.delete('http://localhost:5000/news/:id', toDelete[0]._id)
    //   .then(res => console.log(res.data))

    const articles = data.filter(item => item.title !== id)
    setData(articles)
  }

  console.log(toShow)

  return (
    <div className="container bg-blue-100 rounded-lg max-w-7xl max-h-3/4 overflow-auto text-center mx-auto my-10 bg-gray-100">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl py-3 px-3 text-blue-600"> {toFind}'s News </h1>
      </div>
      {toShow.length === 0 ? <div className="text-red-500 py-5">No News Found</div> :
        <NewsList items={toShow} title={`${toFind}'s News`} isLoading={isLoading} errMessage={errMessage} handleClick={handleDelete} label={buttonLabel} />}
      {(errMessage !== '') && <div className="text-red-500">{errMessage} </div>}
      {isLoading && <div> Loading ... </div>}
    </div>
  )
}

export default UserNews
