const mongoose = require("mongoose");

const InciAkuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "42 AH İNCE ",
        "50 AH AKÜ",
        "60 AH AKÜ",
        "60 AH DAR",
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

const InciAku = mongoose.model("InciAkus", InciAkuSchema); // istenenler mongodb de açılan alan

module.exports = InciAku;
