const mongoose = require("mongoose");

const DuracelAkuSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const DuracelAku = mongoose.model("DuracelAkus", DuracelAkuSchema); // istenenler mongodb de açılan alan

module.exports = DuracelAku ;