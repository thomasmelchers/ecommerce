const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const userRoutes = require('./routes/user.routes')
const plantRoutes = require('./routes/plant.routes')
const cartRoutes = require('./routes/cart.routes')
const orderRoutes = require('./routes/order.routes')
const stripeRoutes = require('./routes/stripe.routes')
const cors = require('cors')

const app = express()

// CONNECTION TO THE DATABASE
const database = require('./config/database')

// ROUTES
app.get('/', (req, res) => {
    res.status(201).json('Welcome to the API')
})

app.use(cors())
app.use(express.json())
app.use('/api/user', userRoutes)
app.use('/api/plant', plantRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/checkout', stripeRoutes)

// SERVEUR
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`The API is running on port : ${port}`)
})