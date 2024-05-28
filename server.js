const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { insertMany } = require('./models/base');
const collection = require('./models/base')


mongoose.connect('mongodb://localhost:27017/test').then(() =>{
    console.log('connecter a la base de données test');
 });
const app = express();
const port = 7080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

let users = []; // Initialize an empty array to store users

app.post('/addUser', (req, res) => {
    const newUser = {
        name: req.body.name,
        login: req.body.login,
        password: req.body.password
    };

    users.push(newUser); // Add the new user to the array

    res.status(201).send('User added successfully');
});

app.get('/users', (req, res) => {
    res.json(users); // Return the list of users
});


app.post('/register', (req, res) => {
    const { name, login, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.send('Passwords do not match. Please try again.');
    }

    // Check for duplicate user
    const userExists = users.find(user => user.name === name && user.login === login);
    if (userExists) {
        return res.send('User already exists. Please use a different login.');
    }

    // Add user to the array
    users.push({ name, login, password });
    res.send(`Bonjour ${name}, ton compte est bien créé!`);
   
});

app.get('/index', (req, res) =>{
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/connexion', (req, res) =>{
    res.sendFile(path.join(__dirname, './connexion.html'))
   
})


    
    

    



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
