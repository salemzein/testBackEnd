const productModel = require("../models/productModel");

//fillter for by product sorting and pagination

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };
    console.log({ befor: queryObj });
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log({ after: queryObj });
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    console.log({ queryObj, queryStr });
    this.query.find(JSON.parse());
    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").json(" ");
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.page * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productCtrl = {
  getProduct: async (req, res) => {
    try {
      console.log(req.query);
      //       res.json("product test");
      const features = new APIfeatures(productModel.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const product = await features.query;
      res.json({
        status: "success",
        result: product.length,
        product: product,
      });
    } catch (err) {
      res.status(501).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const { product_id, title, description, price, content, category } =
        req.body;
      const product = await productModel.findOne({ product_id });
      if (product) {
        return res.status(401).json({ msg: "Product already exists" });
      }
      const newProduct = await productModel({
        product_id,
        title: title.toLowerCase(),
        description,
        price,
        content,
        category,
      });
      await newProduct.save();
      res.json({ msg: "Product created" });
    } catch (err) {
      res.status(501).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await productModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product deleted" });
    } catch (err) {
      res.status(501).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, description, price, content, category } = req.body;
      await productModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title,
          description,
          price,
          content,
          category,
        }
      );
      res.json({ msg: "Product updated" });
    } catch (err) {
      res.status(501).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
