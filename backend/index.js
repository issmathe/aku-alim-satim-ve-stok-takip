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

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;

//connect to the database
app.use("/api", klassAkuRoute)
app.use("/api/kayit", klassAkuKayitRoute)

app.use("/api/mutlu", mutluAkuRoute)
app.use("/api/mutlu/kayit", mutluAkuKayitRoute)


app.listen(PORT, () => {
  database()
  console.log(`Server is running on port ${PORT}`);
});
