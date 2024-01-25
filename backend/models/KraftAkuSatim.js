const mongoose = require("mongoose");

const KraftAkuSatimSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true },
    paymentType: { type: String, enum: ['visa', 'nakit'] } // Yeni alan: ödeme türü
  },
  { timestamps: true }
);

const KraftAkuSatim = mongoose.model("KraftAkuKayits", KraftAkuSatimSchema); // istenenler mongodb de açılan alan

module.exports = KraftAkuSatim ;