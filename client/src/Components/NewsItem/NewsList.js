import React from 'react'

const NewsList = ({ items, title, handleClick, isLoading, errMessage, label, style }) => {
  
  return (
    <div className="w-11/12 mx-auto py-5">
      <h1 className="text-2xl pb-5 text-blue-600"> {title} </h1>
      {(errMessage !== '') && <div className="text-red-500">{errMessage} </div>}
      {isLoading && <div> Loading ... </div>}
      {items && items.map((item) => {
        return (
          <div className="flex justify-between h-40 items-center border-b-2" key={item.title}>
            <div className="text-left w-3/4 py-3">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600"><h2 className="text-lg text-blue-600">{item.title}</h2></a>
              <p>{item.description} <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">read</a></p>
              <p className="text-xs py-2">Published at {new Date(item.publishedAt).toLocaleDateString()} - {new Date(item.publishedAt).toLocaleTimeString()} </p>
            </div>
            {item.urlToImage && <img className="w-48 h-auto" src={item.urlToImage}alt="x" />}
            <div>
              <button onClick={() => handleClick(item.title)} className={style} >{label}
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NewsList
