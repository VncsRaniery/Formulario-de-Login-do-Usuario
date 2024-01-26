const express = require('express');
const pasth = require('path');
const bcrypt = require('bcrypt');
const collection = require('./config');


const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("login");
});

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    const existinguser = await collection.findOne({ name: data.name });
    if (existinguser) {
        res.send("User already exists. Please choose a different username");
    }
     else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        
        res.render("Cadastro-realizado");
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        if(!check) {
            res.send("user name cannot found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send("Invalid password");
        
        }
    } catch {
        res.send("wrong Details");
    }
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})