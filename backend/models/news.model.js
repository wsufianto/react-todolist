const mongoose = require('mongoose')

const Schema = mongoose.Schema

const newsSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }, 
  author: { type: String }, 
  url: { type: String, required: true, unique: true, trim: true }, 
  urlToImage: { type: String }, 
  publishedAt: { type: Date, required: true }, 
  source: { type: String, required: true }
}, {
  timestamps: true,
})

const News = mongoose.model('News', newsSchema)

module.exports = News
