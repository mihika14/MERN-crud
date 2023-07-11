const mongoose = require("mongoose")

const UserDetailSchema = new mongoose.Schema(
       {
              id: Number,
              name: String,
              email: String,
              phone: Number
       },
       {
              collection: "userdetails"
       }
       
);

mongoose.model("userdetails", UserDetailSchema)