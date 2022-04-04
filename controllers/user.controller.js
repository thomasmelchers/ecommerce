const User = require('../models/user.model')


// UPDATE USER
module.exports.update = async (req, res) => {
    
    // check password
    if (req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS).toString()
    }
    
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(500).json(err)
    }
}

// DELETE USER
module.exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch(err) {
        res.status(500).json(err)
    }
}

// USER ADMIN
module.exports.admin = async (req, res) => {
    try {
        const userAdmin = await User.findById(req.params.id)
        const {password, ...others} = userAdmin._doc
        res.status(200).json(others)
    } catch(err) {
        res.status(500).json(err)
    }
}

// USER ALL USERS
module.exports.allUsers = async (req, res) => {

    const query = req.query.new
    try {
        //Using ternary and limit to 5 answers if there is a query ! 
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
}


//GET USERS STATS

module.exports.stats = async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear} } },
            {$project: {
                month: {$month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month", 
                    total: {$sum: 1}}
            }
        ])
        res.status(200).json(data)
    } catch(err){
        res.status(500).json(err)
    }
}
