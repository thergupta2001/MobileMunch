const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('./models/userSchema.js')

const app = express()

mongoose.connect(process.env.MONGO_URL)
     .then(() => {
          console.log('Database connected')
     })
     .catch((err) => {
          console.log('Error during connection ', err)
     })

app.use(bodyParser.json())
app.use(cors())

app.post('/register', async (req, res) => {
     try{
          const {username, email, password} = req.body;
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = new User({ username, email, password: hashedPassword })
          await newUser.save()
          res.status(201).json({ message: 'User created successfully' })
     } catch (err) {
          res.status(500).json({ error: 'Error signing up' })
     }
})

app.get('/register', async (req, res) => {
     try{
          const users = await User.find()
          res.status(201).json(users)
     } catch (err) {
          res.status(500).json({ error: 'Unable to get any user' })
     }
})

app.post('/login', async (req, res) => {
     try{
          const {username, password} = req.body;
          const user = await User.findOne({ username })
          if(!user){
               return res.status(401).json({ error: 'Invalid credentials' })
          }

          const isPasswordValid = bcrypt.compare(password, user.password);
          if(!isPasswordValid){
               return res.status(401).json({ error: 'Invalid credentials' })
          }

          const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
          res.status(200).json({ message: 'Login successful token: ' + token })
     } catch (err) {
          res.status(500).json({ error: 'Error logging in' + err })
     }
})

app.listen(8080, () => {
     console.log('Server on port 8080')
})