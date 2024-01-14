const mongoose = require("mongoose");

const KlassAkuSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const KlassAku = mongoose.model("klassAkus", KlassAkuSchema); // istenenler mongodb de açılan alan

module.exports = KlassAku ;