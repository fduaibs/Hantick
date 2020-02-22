const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
const passport = require('passport');
const userRoutes = require('./routes/api/users');
const loginRoutes = require('./routes/api/login');

const app = express();

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB sucessfully connected"))
.catch(err => console.log(err));

//app.use(passport.initialize());
//require('./config/passport') (passport);
//app.use('/api/users', users);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require('./config/passport') (passport);
app.use(userRoutes);
app.use(loginRoutes);

app.listen(3333, () => console.log("Server is running on port 3333."));