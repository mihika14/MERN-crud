const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    name: String,
    email: {type: String ,unique: true},
    phone: String,
  },
  {
    collection: "userdetails",
  }
);
mongoose.model("userdetails", UserDetailsSchema)