const User = require('../models/user.model')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')


// REGISTRATION

module.exports.signUp = async (req,res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS).toString(),
        isAdmin: req.body.isAdmin
    })
    try {
        const createUser = await newUser.save()
        res.status(201).json(createUser)
    } catch(err){
        res.status(500).json(err)
    }
}

module.exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        })

        // IF THE USER EXISTS
        !user && res.status(401).json('Wrong credentials')

        // DECRYPT THE PASSWORD
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS)
        const pswd = hashedPassword.toString(CryptoJS.enc.Utf8)

        // COMPARE PASSWORD
        pswd !== req.body.password && res.status(401).json('Wrong credentials')


        const accessToken = jwt.sign({
            id : user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY,
        {expiresIn: '3d'}
        )

         // IF CORRECT
         // destructuring user to not show the password
        const { password, ...others } = user._doc
  
        res.status(200).json({others, accessToken})

    } catch (err) {
        res.status(500).json(err)
    }
}