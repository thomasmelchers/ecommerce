const Cart = require('../models/cart.model')

// CREATE CART

module.exports.createCart = async (req, res) => {

    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(201).json({
            status: 'success',
            result: savedCart
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET USER CART

module.exports.getUserCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({userId: req.params.userId});
  
      if (!cart) {
        res.status(404).json("This cart doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: cart,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET ALL

  module.exports.getAllUserCart = async (req, res) => {
    try {
      const carts = await Cart.find({userId: req.params.userId});
  
      if (!carts) {
        res.status(404).json("This cart doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: carts,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

// UPDATE CART
module.exports.updateCart = async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!cart) {
        res.status(404).json("This cart doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: cart,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // DELETE CART

module.exports.deleteCart = async (req, res) => {
    try {
      const cart = await Plant.findByIdAndDelete(req.params.id);
  
      if (!cart) {
        res.status(404).json("This plant doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: "The cart has been removed from the database",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };