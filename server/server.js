const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());


app.use("/api", require("./routes/stratex"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
