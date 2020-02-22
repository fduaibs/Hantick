const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../validation/register');

module.exports = {
    async store(request, response) {
        const { errors, isValid } = validateRegisterInput(request.body);
        if(!isValid) {
            return response.status(400).json(errors);
        }
    
        User.findOne({ email: request.body.email }).then(user => {
            if(user) {
                return response.status(400).json({ email: "Email is already in use!" });
            } else {
                const newUser = new User({
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password
                });
            
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save().then(user => response.json(user)).catch(err => console.log(err));
                    });
                });
            }
        });
    }
};