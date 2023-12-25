const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const User = require('./models/userSchema.js')
const MobileModel = require('./models/mobileModels.js')
// const cookieParser = require('cookie-parser')

const app = express()

mongoose.connect(process.env.MONGO_URL)
     .then(() => {
          console.log('Database connected')
     })
     .catch((err) => {
          console.log('Error during connection ', err)
     })

app.use(bodyParser.json())
// app.use(cookieParser())
app.use(cors())

app.post('/register', async (req, res) => {
     try {
          const { username, email, password } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = new User({ username, email, password: hashedPassword })
          await newUser.save()
          res.status(201).json({ message: 'User created successfully' })
     } catch (err) {
          res.status(500).json({ error: 'Error signing up' })
     }
})

app.get('/register', async (req, res) => {
     try {
          const users = await User.find()
          res.status(201).json(users)
     } catch (err) {
          res.status(500).json({ error: 'Unable to get any user' })
     }
})

app.post('/login', async (req, res) => {
     try {
          const { username, password } = req.body;
          const user = await User.findOne({ username })
          if (!user) {
               return res.status(401).json({ error: 'Invalid credentials' })
          }

          const isPasswordValid = bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
               return res.status(401).json({ error: 'Invalid credentials' })
          }

          const token = jwt.sign({ userId: user._id, username: user.username, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' })
          // .then(() => res.cookie('token', token))
          res.status(200).json({ message: token, username: username })
     } catch (err) {
          res.status(500).json({ error: 'Error logging in' + err })
     }
})

app.post('/mobiles', async (req, res) => {
     try {
          const { name, model, price, memory, image } = req.body;

          const newMobile = new MobileModel({ name, model, price, memory, image })
          await newMobile.save()

          res.status(201).json({ message: 'Mobile added successfully' })
     } catch (err) {
          res.status(500).json({ error: 'Error adding mobile ' + err })
     }
})

app.get('/mobiles', async (req, res) => {
     try {
          const mobiles = await MobileModel.find()
          res.status(201).json(mobiles)
     } catch (err) {
          res.status(500).json({ error: 'Unable to find any mobile ' + err })
     }
})

app.post('/placeOrder', async (req, res) => {
     try {
          const { username, mobileName, mobileModel, price } = req.body;

          const user = await User.findOne({ username })

          user.orders.push({ mobileName, mobileModel, price })

          await user.save()

          res.status(201).json({ message: 'Mobile added to orders' + user })
          // res.json(user)
     } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error placing order' });
     }
})

app.post('/getOrders', async (req, res) => {
     try {
          const { username } = req.body;

          const user = await User.findOne({ username })

          if (!user) {
               return res.status(401).json({ message: 'Error finding the user' })
          }

          res.status(201).json({ message: 'Orders are here ', user })
     } catch (err) {
          res.status(500).json({ error: "Error getting the user's orders ", err })
     }
})

app.delete('/deleteOrder/:orderId', async (req, res) => {
     try {
          const { username } = req.body;
          const { orderId } = req.params

          const user = await User.findOneAndUpdate(
               { username },
               { $pull: { orders: { _id: orderId } } },
               { new: true }
          )

          res.status(200).json({ message: 'Order deleted successfully', user });
     } catch (err) {
          console.error('Error deleting order:', err);
          res.status(500).json({ error: 'Error deleting order' + err });
     }
})

app.listen(8080, () => {
     console.log('Server on port 8080')
})