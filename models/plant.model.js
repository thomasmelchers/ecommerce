const mongoose = require('mongoose')

const PlantSchema = new mongoose.Schema(
    {
        plant: {
            type: String, 
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String, 
            required: true
        },
        categories: {
            type: Array,
        },
        price: {
            type: Number, 
            required: true
        }
    }, {timestamp: true}
)

module.exports = mongoose.model("Plant", PlantSchema)