const mongoose = require("mongoose");

const DuracelAkuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: [
        "45 DAR AKÜ ",
        "60 AH AKÜ ",
        "70 EFB AKÜ",
        "70 AGM AKÜ",
        "72 AH AKÜ",
        "92 AGM AKÜ",
      ],
    },
    price: { type: Number, required: true },
    piece: { type: Number, required: true },
  },
  { timestamps: true }
);

const DuracelAku = mongoose.model("DuracelAkus", DuracelAkuSchema); // istenenler mongodb de açılan alan

module.exports = DuracelAku ;