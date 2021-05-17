const router = require('express').Router()
let News = require('../models/news.model')
const auth = require('../middleware/auth.js')

router.get('/', async (req, res) => {
  try {
    const response = await News.find()
    return res.json(response)
  } catch (err) {
    res.send({ code: 400, msg: err.message });
  }
})

router.get('/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const response = await News.find({ userId }).sort('-createdAt')
    return res.json(response)
  } catch (err) {
    res.send({ code: 400, msg: err.message })
  }
})

router.post('/save', auth, async (req, res) => {

  const { userId, title, description, author, url, urlToImage, publishedAt, source } = req.body

  try {
    const existingNews = await News.find({ title, userId })

    if (existingNews.length !== 0) {
      return res.send({ code: 409, msg: "News Exists!" })
    }

    const newNews = new News({
      userId,
      title,
      description,
      author,
      url,
      urlToImage,
      publishedAt,
      source
    })

    await newNews.save()
    return res.send({ code: 200, msg: "News Saved!" })

  } catch (err) {
    res.send({ code: 500, msg: err.message })
  }
})

router.delete('/delete/:id', auth, async (req, res) => {

  const { id } = req.params

  try {
    await News.findByIdAndDelete(id)
    return res.send({ code: 200, msg: "News Deleted!"})
  } catch (err) {
    res.send({ code: 400, msg: err.message })
  }
})

module.exports = router

