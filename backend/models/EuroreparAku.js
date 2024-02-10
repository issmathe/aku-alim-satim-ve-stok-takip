const mongoose = require("mongoose");

const EuroreparAkuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "60 AH AKÜ", 
        "60 EFB AKÜ",
        "70 EFB AKÜ",
        "70 AGM AKÜ",
        "72 AH AKÜ",
      ],
    },
    price: { type: Number, required: true },
    piece: { type: Number, required: true },
  },
  { timestamps: true }
);

const EuroreparAku = mongoose.model("EuroreparAkus", EuroreparAkuSchema); // istenenler mongodb de açılan alan

module.exports = EuroreparAku;