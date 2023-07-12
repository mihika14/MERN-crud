require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./model/user");
const cors = require("cors");
const router = require("./routes/router");

const port = process.env.PORT || 8003;

const mongoUrl =
  "mongodb+srv://user123:reena123@cluster0.l58kdcd.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./model/user");

const User = mongoose.model("userdetails");
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("server start")
})

app.use(router);

app.listen(port, () => {
    console.log(`server is start port number ${port}`);
});