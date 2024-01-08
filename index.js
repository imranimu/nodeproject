const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
// Connect to MongoDB
mongoose.connect(
    "mongodb+srv://imranhossainchefonline:f038kRzsxcSLSK0Y@test.hvsa4rk.mongodb.net/",
    {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
    }
);
//Schema Define
const myStudent = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    age: Number,
});

const Student = mongoose.model("Student", myStudent);

// Read (GET) operation
app.get('/api/v1/getStudents', async (req, res) => {
    const AllStudents = await Student.find({});
    if (AllStudents.length > 0) {
        res.json(AllStudents)
    } else {
        res.json({ Message: "Not Students Data In Database" })
    }

});

// Single Student Information
app.get('/api/v1/getStudents/:id', async (req, res) => {

    if (req.params.id.length != 24) return res.json({ Message: "Please check the Id" })
    const studentId = await Student.findById(req.params.id);

    if (!studentId) { return res.json({ Message: "Please check the Id" }) }
    const AllStudents = await Student.findById(req.params.id);

    res.json(AllStudents)

});

// Create (POST) operation
app.post('/api/v1/student', async (req, res) => {
    const errors = {}

    const { name, email, phone, age } = req.body;

    const existingEmail = await Student.findOne({ email: req.body.email });

    if (existingEmail) errors.email = "Email already exits"
    if (!name || typeof name !== 'string' || !/^[A-Za-z]+$/.test(name)) errors.name = 'Name is required,and must contain only alphabetic characters (A-Z or a-z)';
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) errors.email = 'Email is required and must be a valid email address';
    if (!phone || !/^\d{11}$/.test(phone)) errors.phone = 'Phone is required and must be a valid phone number';
    if (!age || isNaN(age) || age < 18 || age > 100) errors.age = `Age is required and must be a valid age between 18 and 100`;

    if (Object.keys(errors).length > 0) {
        return res.json({ errors });
    }

    const createdUser = new Student({
        name,
        email,
        phone,
        age,
    });
    await createdUser.save();

    res.json(createdUser);
});

// Update (PUT) operation
app.put('/api/v1/student/:id', async (req, res) => {

    if (req.params.id.length != 24) return res.json({ Message: "Please check the Id" })
    
    const studentId = await Student.findById(req.params.id);

    if (!studentId) return res.json({ Message: "Please check the Id" })

    const updateddata = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updateddata);
});

// Delete (DELETE) operation
app.delete('/api/v1/student/:id', async (req, res) => {

    if (req.params.id.length != 24) return res.json({ Message: "Please check the Id" })
    const studentId = await Student.findById(req.params.id);

    if (!studentId) { return res.json({ Message: "Please check the Id" }) }
    await Student.findByIdAndDelete(req.params.id)

    res.json({ message: "Deleted" })

});

// Delete (DELETE) operation [ WHOLE STUDENTS]
app.delete('/api/v1/student', async (req, res) => {

    await Student.deleteMany({});

    res.json({ message: "Delete Whole Student Documents" })

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});