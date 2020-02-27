const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
const passport = require('passport');
const routes = require('./routes');
const app = express();

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB sucessfully connected"))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require('./config/passport') (passport);
app.use(routes);

app.listen(3333, () => console.log("Server is running on port 3333."));