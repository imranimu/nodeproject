const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://imranhossainchefonline:f038kRzsxcSLSK0Y@test.hvsa4rk.mongodb.net/",
  {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  }
);

const Schema = mongoose.Schema;
const mySchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  age: Number,
});

const myStudent = new Schema({
  name: String,
  email: String,
  phone: Number,
  age: Number,
});

const MyModel = mongoose.model("MyModel", mySchema);

const Student = mongoose.model("Student", myStudent);

app.use(express.json());

app.post("/api/v1/contactform", async (req, res) => {
  const { name, email, phone, age } = req.body;
    const createdUser = new MyModel({
        name,
        email,
        phone,
        age,
    });
    await createdUser.save();
    res.json(createdUser);
});

app.post("/api/v1/contactformupdate", async (req, res) => {
    const { name, email, phone, age } = req.body;
    const createdUser = new MyModel({
        name,
        email,
        phone,
        age        
    });
    await createdUser.save();
    res.json(createdUser);
});

app.post("/api/v1/student", async (req, res) => {
    const { name, email, phone, age } = req.body;  
    const createdUser = new Student({
      name,
      email,
      phone,
      age,
    });
    await createdUser.save();
    res.json(createdUser);
});

app.get("/api/v1/getuser", async (req, res) =>{
    const AllData = await MyModel.find({}); 

    res.send(AllData);
}); 

app.get("/api/v1/getstudents", async (req, res) =>{
    const AllStudents = await Student.find({}); 

    res.send(AllStudents);
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});