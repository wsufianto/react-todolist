import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (urlLink) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errMessage, setErrMessage] = useState('')

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getNews = async () => {
      try {
        const response = await axios.get(urlLink, {
          cancelToken: source.token
        })
        setData(response.data)
        setIsLoading(false)
        setErrMessage('')
      } catch(err) {
        if (axios.isCancel(err)) {
          console.log('fetch cancelled!')
        } else {
          setIsLoading(false)
          setErrMessage(err.message)
        }
      } 
    }
    getNews()

    return () => {
      // console.log("Cleanup")
      source.cancel()
    }  
  }, [urlLink])

  return { data, setData, isLoading, errMessage }
}

export default useFetch