const mongoose = require("mongoose");

const KlassAkuKayitSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const KlassAkuKayit = mongoose.model("KlassAkuKayits", KlassAkuKayitSchema); // istenenler mongodb de açılan alan

module.exports = KlassAkuKayit ;