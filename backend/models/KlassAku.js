const mongoose = require("mongoose");

const KlassAkuSchema = mongoose.Schema(
  {
    name: { type: String, enum:
    ['KLAS 60 AH AKÜ',
    'KLAS 60 AH DAR',
    'KLAS 70 AH EFB',
    'KLAS 72 AH AKÜ',
    'KLAS 90 AH AKÜ',
    'KLAS 100 AH AKÜ',
    'KLAS 105 AH AKÜ',
    'KLAS 135 AH AKÜ',
    'KLAS 150 AH AKÜ',
    'KLAS 180 AH AKÜ',
    'KLAS 225 AH AKÜ',
  ] } ,
    price: { type: Number, required: true },
    piece: { type: Number, required: true }
  },
  { timestamps: true }
);

const KlassAku = mongoose.model("klassAkus", KlassAkuSchema); // istenenler mongodb de açılan alan

module.exports = KlassAku ;