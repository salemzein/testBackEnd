const categoryModel = require("../models/categoryModel");

const categoryCtrl = {
  getCatgories: async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.json(categories);
    } catch (err) {
      return res.status(501).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role =1 admin
      //only admin create delete update category
      const { name } = req.body;
      const category = await categoryModel.findOne({ name });
      if (category) {
        return res.status(401).json({ msg: "Category already exists" });
      }
      const newCategory = new categoryModel({ name });
      await newCategory.save();
      res.json("created category");
    } catch (err) {
      return res.status(501).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await categoryModel.findByIdAndDelete(req.params.id);
      res.json("deleted category");
    } catch (err) {
      return res.status(501).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await categoryModel.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "updated category" });
    } catch (err) {
      return res.status(501).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
