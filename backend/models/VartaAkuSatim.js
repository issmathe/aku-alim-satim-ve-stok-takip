const mongoose = require("mongoose");

const VartaAkuSatimSchema = mongoose.Schema(
  {
    aku: { type: String, required: true },
    name: { type: String, required: true },
    piece: { type: Number, required: true },
    paymentType: { type: String, enum: ['visa', 'nakit'] } // Yeni alan: ödeme türü
  },
  { timestamps: true }
);

const VartaAkuSatim = mongoose.model("VartaAkuKayits", VartaAkuSatimSchema); // istenenler mongodb de açılan alan

module.exports = VartaAkuSatim ;