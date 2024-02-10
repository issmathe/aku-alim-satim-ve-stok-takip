const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./database.js');

//routes
const klassAkuRoute = require("./routes/klassAkus.js")
const klassAkuKayitRoute = require("./routes/klassAkuSatim.js")

const mutluAkuRoute = require("./routes/mutluAku.js")
const mutluAkuKayitRoute = require("./routes/mutluAkuSatim.js")

const inciAkuRoute = require("./routes/inciAku.js")
const inciAkuKayitRoute = require("./routes/inciAkuSatim.js")

const vartaAkuRoute = require("./routes/vartaAku.js")
const vartaAkuKayitRoute = require("./routes/vartaAkuSatim.js")

const kraftAkuRoute = require("./routes/kraftAku.js")
const kraftAkuKayitRoute = require("./routes/kraftAkuSatim.js")

const duracelAkuRoute = require("./routes/duracelAku.js")
const duracelAkuKayitRoute = require("./routes/duracelAkuSatim.js")

const euroreparAkuRoute = require("./routes/euroreparAku.js")
const euroreparAkuKayitRoute = require("./routes/euroreparAkuSatim.js")


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

//connect to the database
app.use("/api/klas", klassAkuRoute)
app.use("/api/klas/kayit", klassAkuKayitRoute)

app.use("/api/mutlu", mutluAkuRoute)
app.use("/api/mutlu/kayit", mutluAkuKayitRoute)

app.use("/api/inci", inciAkuRoute)
app.use("/api/inci/kayit", inciAkuKayitRoute)

app.use("/api/varta", vartaAkuRoute)
app.use("/api/varta/kayit", vartaAkuKayitRoute)

app.use("/api/kraft", kraftAkuRoute)
app.use("/api/kraft/kayit", kraftAkuKayitRoute)

app.use("/api/duracel", duracelAkuRoute)
app.use("/api/duracel/kayit", duracelAkuKayitRoute)

app.use("/api/eurorepar", euroreparAkuRoute)
app.use("/api/eurorepar/kayit", euroreparAkuKayitRoute)

app.listen(PORT, () => {
  database()
  console.log(`Server is running on port ${PORT}`);
});
