const Category = require("../models/InciAkuSatim.js");
const express = require("express");
const router = express.Router();

router.get("/total", async (req, res) => {
  try {
    // MongoDB koleksiyonundan tüm belgeleri çekin
    const allData = await Category.find();

    // 'piece' değerlerinin toplamını hesaplayın
    const totalSum = allData.reduce((acc, item) => acc + item.piece, 0);

    // Toplamı yanıt olarak gönderin
    res.json({ totalSum });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();

    res.status(200).json({ message: "kayıt başarılı" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Kategori bulunamadı." });
    }

    res
      .status(200)
      .json({ message: "Güncelleme başarılı", data: updatedCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findOneAndDelete({
      _id: categoryId,
    });

    if (!deletedCategory) {
      return res.status(404).json({ error: "Kategori bulunamadı." });
    }

    res.status(200).json({ message: "Silme başarılı", data: deletedCategory });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
