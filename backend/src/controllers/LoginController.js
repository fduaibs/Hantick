const validateLoginInput = require('../validation/login');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys')
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    async store(request, response) {
        const { errors, isValid } = validateLoginInput(request.body);

        if(!isValid) {
            return response.status(400).json(errors);
        }

        const email = request.body.email;
        const password = request.body.password;

        User.findOne({ email }).then(user => {
            if(!user) {
                return response.status(404).json({ emailnotfound: "Email not found!" });
            }
            bcrypt.compare(password, user.password).then(isMatch => {
                if(isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name
                    };
    
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926}, (err, token) => {
                        response.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    })
                } else {
                    return response.status(400).json({ passwordincorrect: "Password incorrect!"});
                }
            })
        })
    }
};