const Order = require('../models/order.model')

// CREATE CART

module.exports.createOrder = async (req, res) => {

    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(201).json({
            status: 'success',
            result: savedOrder
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET USER CART

module.exports.getUserOrder = async (req, res) => {
    try {
      const order = await Order.findOne({userId: req.params.userId});
  
      if (!order) {
        res.status(404).json("This order doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: order,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // GET ALL

  module.exports.getAllUserOrder = async (req, res) => {
    try {
      const orders = await Order.find({userId: req.params.userId});
  
      if (!orders) {
        res.status(404).json("These orders don't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: orders,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

// UPDATE CART
module.exports.updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!order) {
        res.status(404).json("This order doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: order,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  // DELETE CART

module.exports.deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
  
      if (!order) {
        res.status(404).json("This order doesn't exist ! ");
      }
  
      res.status(200).json({
        status: "success",
        result: "The order has been removed from the database",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };