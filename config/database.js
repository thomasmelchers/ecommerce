const mongoose = require('mongoose')

mongoose.connect(
    process.env.DATABASE, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false 
    }
)
.then(() => console.log('Successfully connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err))

module.export = mongoose