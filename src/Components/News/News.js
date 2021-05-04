import React from 'react'
import useFetch from '../../Helpers/useFetch';
import NewsList from '../NewsItem/NewsList'
import { useParams } from 'react-router-dom'
import { country } from '../../Helpers/CountryCode'
import axios from 'axios'
require('dotenv').config();

const News = () => {

  let { region } = useParams()

  const url = `https://newsapi.org/v2/top-headlines?country=${region}&apiKey=${process.env.REACT_APP_API_KEY}`

  const buttonLabel = (
    <svg
      className="w-6 h-6 text-blue-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
      clipRule="evenodd"
    />
    </svg>
  )

  const { data, setData, isLoading, errMessage } = useFetch(url)

  console.log(data)

  const handleSave = (id) => {
    console.log("Saved to Db")
    const selectedNews = data.articles.filter(item => item.title === id)

    const saveNews = {
      username: "Peter Parker",
      title: selectedNews[0].title,
      description: selectedNews[0].description, 
      author: selectedNews[0].author || '',
      url: selectedNews[0].url, 
      urlToImage: selectedNews[0].urlToImage, 
      publishedAt: selectedNews[0].publishedAt, 
      source: selectedNews[0].source.name
    }

    console.log(saveNews)

    axios.post('http://localhost:5000/news/add', saveNews)
      .then(res => console.log(res.data))

    const articles = data.articles.filter(item => item.title !== id)
    console.log(articles)
    setData({articles})
  }

  const handleRefresh = () => {
    console.log("refreshing")
    window.location.reload(false)
  }

  return (
    <div className="container bg-blue-100 rounded-lg max-w-7xl max-h-3/4 overflow-auto text-center mx-auto my-10 bg-gray-100">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl py-3 px-3 text-blue-600"> Latest News </h1> 
        <button className="p-2 bg-blue-500 text-white rounded-lg border-2 shadow-md" onClick={handleRefresh}>Refresh</button>
      </div>
      <NewsList items={data.articles} title={`${country[region]} News`} handleClick={handleSave} isLoading={isLoading} errMessage={errMessage} label={buttonLabel} />
    </div>
  )
}

export default News