const router = require("express").Router();
const categoryCtrl = require("../controllers/categoryControl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/category", categoryCtrl.getCatgories);
router.post("/category", auth, authAdmin, categoryCtrl.createCategory);
router.delete("/category/:id", auth, authAdmin, categoryCtrl.deleteCategory);
router.put("/category/:id", auth, authAdmin, categoryCtrl.updateCategory);
module.exports = router;
