const mongoose = require("mongoose");

const MutluAkuSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const MutluAku = mongoose.model("MutluAkus", MutluAkuSchema); // istenenler mongodb de açılan alan

module.exports = MutluAku ;