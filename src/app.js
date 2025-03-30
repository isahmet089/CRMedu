// app.js
require("dotenv").config();
const express = require('express');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dbConnect = require('./config/dbConfig');
const authRoutes = require('./routes/authRoutes.js');
const {authMiddleware, sessionMiddleware} = require('./middleware/authMiddleware');
const checkRole = require('./middleware/checkRole.js');

const app = express();
dbConnect();

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions",
});

app.use(
    session({
        secret: "gizli_kelime",
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: { maxAge: 1000 * 60 * 60 },
    })
);

app.use(sessionMiddleware); // Tüm endpointler için sessionMiddleware'i kullan 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.set("view engine", "ejs");

app.use('/auth', authRoutes);

// Oturum kontrolü gerektiren endpointler
app.get('/index', authMiddleware, (req, res) => 
    res.render('index', { title: 'Home' })
);

app.get('/costumer-add', authMiddleware, checkRole('student'), (req, res) => 
    res.render('costumerAdd')
);

app.get('/costumer-list', authMiddleware, (req, res) => 
    res.render('costumerList')
);

app.get('/user-list', authMiddleware, (req, res) => 
    res.render('userList')
);

app.get('/user-add', authMiddleware, (req, res) => 
    res.render('userAdd')
);

app.get('/support', authMiddleware, (req, res) => 
    res.render('support')
);

app.get('/documentation', authMiddleware, (req, res) => 
    res.render('doc')
);

// Giriş yapmayanların erişebileceği endpointler
app.get('/login', (req, res) => 
    res.render('login')
);
// Giriş yapmayanların erişebileceği endpointler
app.get('/register', (req, res) => 
  res.render('register')
);
app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`
));