const router = require("express").Router();
const productCtrl = require("../controllers/productControl");
router.get("/product", productCtrl.getProduct);
router.post("/product", productCtrl.createProduct);
router.delete("/product/:id", productCtrl.deleteProduct);
router.put("/product/:id", productCtrl.updateProduct);

module.exports = router;
