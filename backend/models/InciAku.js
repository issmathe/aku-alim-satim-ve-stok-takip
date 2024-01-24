const mongoose = require("mongoose");

const InciAkuSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const InciAku = mongoose.model("InciAkus", InciAkuSchema); // istenenler mongodb de açılan alan

module.exports = InciAku;