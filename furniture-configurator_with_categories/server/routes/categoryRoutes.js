const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: "Ошибка создания категории" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Ошибка удаления категории" });
  }
});

module.exports = router;
