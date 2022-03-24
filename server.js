const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()

app.get('/', (req, res) => {
    res.status(201).json('Welcome to the API')
})

// SERVEUR
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`The API is running on port : ${port}`)
})