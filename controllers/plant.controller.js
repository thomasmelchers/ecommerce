const Plant = require("../models/plant.model");

// ALL PLANTS
module.exports.allPlants = async (req, res) => {
    // 1. Filtering data
  const queryObj = { ...req.query };

  // Excluding some fieds
  const excludeFields = ["page", "sort", "limit", "fields"];
  excludeFields.forEach((el) => delete queryObj);

  // THE QUERY
  let query = Plant.find(queryObj);

  try {
    const plants = await query;
    res.status(200).json({
      total: plants.length,
      results: plants,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// ONE PLANT
module.exports.onePlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);

    if (!plant) {
      res.status(404).json("This plant doesn't exist ! ");
    }

    res.status(200).json({
      status: "success",
      result: plant,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// CREATE PLANT
module.exports.createPlant = async (req, res) => {
  const newPlant = new Plant(req.body);

  try {
    const savedPlant = await newPlant.save();
    res.status(200).json({
      status: "success",
      result: savedPlant,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE PLANT
module.exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plant) {
      res.status(404).json("This plant doesn't exist ! ");
    }

    res.status(200).json({
      status: "success",
      result: plant,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// DELETE PLANT

module.exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);

    if (!plant) {
      res.status(404).json("This plant doesn't exist ! ");
    }

    res.status(200).json({
      status: "success",
      result: "The plant has been removed from the database",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
