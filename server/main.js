const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

const mongoUrl =
  "mongodb+srv://user123:Ha17faniQ3E3nQr3@cluster0.l58kdcd.mongodb.net/?retryWrites=true&w=majority";

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

app.post("./users", async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    const user = new User({ id, name, email, phone });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server error" });
  }
});

//get user by userid
app.get("users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//update specific user
app.put('/users/:user_id', async (req, res) => {
       try {
         const { user_id } = req.params;
         const { name, email, phone } = req.body;
         const user = await User.findByIdAndUpdate(user_id, { name, email, phone }, { new: true });
         if (!user) {
           return res.status(404).json({ error: 'User not found' });
         }
         res.json(user);
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
       }
     });

     app.delete('/users/:user_id', async (req, res) => {
       try {
         const { user_id } = req.params;
         const user = await User.findByIdAndDelete(user_id);
         if (!user) {
           return res.status(404).json({ error: 'User not found' });
         }
         res.json({ message: 'User deleted successfully' });
       } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'Internal server error' });
       }
     });
     
app.listen(3001, () => {
       console.log('Server listening on port 3001');
     });