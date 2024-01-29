const mongoose = require("mongoose");

const InciAkuSatimSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true },
    paymentType: { type: String, enum: ['visa', 'nakit','veresiye'] } // Yeni alan: ödeme türü
  },
  { timestamps: true }
);

const InciAkuSatim = mongoose.model("InciAkuKayits", InciAkuSatimSchema); // istenenler mongodb de açılan alan

module.exports = InciAkuSatim ;