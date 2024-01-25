const mongoose = require("mongoose");

const KraftAkuSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const KraftAku = mongoose.model("KraftAkus", KraftAkuSchema); // istenenler mongodb de açılan alan

module.exports = KraftAku ;