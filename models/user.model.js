const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Providing an username is mandatory to register.'],
            unique: [true, 'This username is already taken, please choose another one.'],
            trim: true,
        },
        email: {
            type: String, 
            required: [true, 'Providing an email is mandatory to register.'],
            unique: [true, 'This email is already taken.'],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, 'Providing a password is mandatory to register.'],
            trim: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
            trim: true,
        }
    }, {timestamps: true}
)

module.exports = mongoose.model("User", UserSchema)