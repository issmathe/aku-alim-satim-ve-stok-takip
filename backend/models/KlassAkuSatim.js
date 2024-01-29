const mongoose = require("mongoose");

const KlassAkuSatimSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true },
    paymentType: { type: String, enum: ['visa', 'nakit','veresiye'] } // Yeni alan: ödeme türü
  },
  { timestamps: true }
);

const KlassAkuSatim = mongoose.model("KlassAkuKayits", KlassAkuSatimSchema); // istenenler mongodb de açılan alan

module.exports = KlassAkuSatim ;