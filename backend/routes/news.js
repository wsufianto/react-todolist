const router = require('express').Router()
let News = require('../models/news.model')

router.route('/').get((req, res) => {
  News.find()
    .then(newsList => res.json(newsList))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const title = req.body.title
  const description = req.body.description
  const author = req.body.author
  const url = req.body.url
  const urlToImage = req.body.urlToImage
  const publishedAt = Date.parse(req.body.publishedAt)
  const source = req.body.source

  const newNews = new News({
    username,
    title,
    description,
    author,
    url,
    urlToImage,
    publishedAt,
    source
  })

  newNews.save()
    .then(() => res.json('News Added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
  News.findById(req.params.id)
    .then(newsPost => res.json(newsPost))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
  News.findByIdAndDelete(req.params.id)
    .then(() => res.json('News Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
  News.findById(req.params.id)
    .then(newsPost => {
      newsPost.username = req.body.username
      newsPost.title = req.body.title
      newsPost.description = req.body.description
      newsPost.author = req.body.author
      newsPost.url = req.body.url
      newsPost.urlToImage = req.body.urlToImage
      newsPost.publishedAt = Date.parse(req.body.publishedAt)
      newsPost.source = req.body.source
      
      newsPost.save()
        .then(() => res.json('News Updated!'))
        .catch(err => res.status(400).json('Error: '))
    })
    .catch(err => res.status(400).json('Error: '))
})

module.exports = router

