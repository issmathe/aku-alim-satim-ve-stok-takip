const mongoose = require("mongoose");

const VartaAkuSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const VartaAku = mongoose.model("VartaAkus", VartaAkuSchema); // istenenler mongodb de açılan alan

module.exports = VartaAku;