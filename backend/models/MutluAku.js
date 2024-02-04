const mongoose = require("mongoose");

const MutluAkuSchema =mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "60 AH AKÜ",
        "72 AH AKÜ",
        "105 AH AKÜ",
        "135 AH AKÜ",
        "180 AH AKÜ",
      ],
    },
    price: { type: Number, required: true },
    piece: { type: Number, required: true },
  },
  { timestamps: true }
);

const MutluAku = mongoose.model("MutluAkus", MutluAkuSchema); // istenenler mongodb de açılan alan

module.exports = MutluAku ;