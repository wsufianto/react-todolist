const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const router = require('express').Router()
let User = require('../models/user.model')

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })
    
    if (!existingUser) return res.status(404).json({message: "User does not exist!"})
    
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    
    if (!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials!"})
    
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY, { expiresIn: "1h" })
    
    res.status(200).json({ result: existingUser, token })
    
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/signup', async (req, res) => {
  
  const { firstName, lastName, email, password, cfmPassword } = req.body
  
  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) return res.status(400).json({message: "User already exist!"})

    if (password !== cfmPassword) return res.status(400).json({message: "Password does not match"})

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({ firstName, lastName, email, password: hashedPassword})

    const token = jwt.sign({ email: result.email, id: result._id}, process.env.SECRET_KEY, { expiresIn: "1h" })
    
    res.status(200).json({ result, token })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/', async (req, res) => {

  try {
    const response = await User.find()
    return res.json(response)
  } catch (err) {
    return res.send({ code: 400, msg: err.message })
  }
})

module.exports = router