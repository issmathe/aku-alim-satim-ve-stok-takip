const mongoose = require("mongoose");

const KraftAkuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "60 AH AKÜ",
        "70 AH EFB",
        "72 AH AKÜ",
        "90 AH TERS",
        "135 AH AKÜ",
        "180 AH AKÜ",
      ],
    },
    price: { type: Number, required: true },
    piece: { type: Number, required: true },
  },
  { timestamps: true }
);

const KraftAku = mongoose.model("KraftAkus", KraftAkuSchema); // istenenler mongodb de açılan alan

module.exports = KraftAku; 