const mongoose = require("mongoose");

const DuracelAkuSatimSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true },
    paymentType: { type: String, enum: ['visa', 'nakit','veresiye'] } // Yeni alan: ödeme türü
  },
  { timestamps: true }
);

const DuracelAkuSatim = mongoose.model("DuracelAkuKayits", DuracelAkuSatimSchema); // istenenler mongodb de açılan alan

module.exports = DuracelAkuSatim ;