const mongoose = require("mongoose");

const EuroreparAkuSatimSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true },
    paymentType: { type: String, enum: ['visa', 'nakit','veresiye'] } // Yeni alan: ödeme türü
  },
  { timestamps: true }
);

const EuroreparAkuSatim = mongoose.model("EuroreparAkuKayits", EuroreparAkuSatimSchema); // istenenler mongodb de açılan alan

module.exports = EuroreparAkuSatim ;