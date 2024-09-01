const express = require('express');
const cors = require('cors');
require("dotenv").config();
const connectDB = require('./config/connectDB');
const router = require('./routers/index');

const app = express();
app.use(
  cors({
    origin: process.env.FRNTEND_URL,
    Credentials:true
  })
);
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({
    message: "Server runngin at port " + PORT,
    success:true
  })
})



// api endpints
app.use("/api", router);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server running at " + PORT);
  });
});






































