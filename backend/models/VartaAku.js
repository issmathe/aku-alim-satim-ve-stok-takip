const mongoose = require("mongoose");

const VartaAkuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "74 AH AKÜ",
        "60 AH EFB",
        "70 AH EFB",
        "70 AH AGM",
        "105 AH AKÜ",
        "180 AH AKÜ",
        "240 AH EFB",
      ],
    },
    price: { type: Number, required: true },
    piece: { type: Number, required: true },
  },
  { timestamps: true }
);

const VartaAku = mongoose.model("VartaAkus", VartaAkuSchema); // istenenler mongodb de açılan alan

module.exports = VartaAku;