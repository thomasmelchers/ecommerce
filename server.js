const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const userRoute = require('./routes/user.routes')

const app = express()

// CONNECTION TO THE DATABASE
const database = require('./config/database')

// ROUTES
app.get('/', (req, res) => {
    res.status(201).json('Welcome to the API')
})

app.use(express.json())
app.use('/api/user', userRoute)

// SERVEUR
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`The API is running on port : ${port}`)
})