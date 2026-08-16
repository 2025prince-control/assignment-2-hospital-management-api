const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const session = require('express-session');

const authRouter = require('./router/authRouter');
const hospitalRouter = require('./router/hospitalRouter');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Hospital Management API is running'
    });
});

app.use('/', authRouter);
app.use('/hospitals', hospitalRouter);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});