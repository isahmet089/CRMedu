const express = require('express')
const app = express()
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConfig');
dotenv.config();
dbConnect();

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set("view engine", "ejs");


const PORT = process.env.PORT
app.get('/', (req, res) => 
    res.render('index', { title: 'Home' })
);
app.get('/login', (req, res) => 
    res.render('login')
);


app.listen(process.env.PORT, () =>
     console.log(`Example app listening on port ${PORT}!`
     ));