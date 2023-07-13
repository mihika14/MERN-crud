const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());

const mongoUrl =
  "mongodb+srv://mihikasaxena13:gnnsT8UbgvCPG20r@userdetails.7wemnrp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("userdetails");

// code to get all the details of the users
app.get("/userdetails", function (req, res, next) {
  User.find({})
    .then(function (users) {
      res.send(users);
    })
    .catch(next);
});

// code for new user registration
app.post("/register", async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      phone,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

// PUT /users/<user_id> , to get information of user via user_id
app.put("/users/:id", function (req, res, next) {
  const { id } = req.params;
  const { name, email, phone, description } = req.body;

  User.findByIdAndUpdate(id, { name, email, phone }, { new: true })
    .then(function (user) {
      if (!user) {
        return res.sendStatus(404);
      }
      res.send(user);
    })
    .catch(next);
});

// DELETE /users/<user_id> , to delete information of user via user_id
app.delete("/users/:id", function (req, res, next) {
  User.findOneAndDelete({ _id: req.params.id }).then(function (user) {
    res.send(user);
  });
});

app.listen(5000, () => {
  console.log("server running on port 5000");
});
