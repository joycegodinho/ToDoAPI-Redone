const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res) => {
    let email = req.body.email.trim().toLowerCase();
    let newUser = await new models.User(req.body);
    const hashed = await bcrypt.hash(req.body.password, 10);
    newUser.password = hashed;
    newUser.email = email;

    newUser.save((err, result) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).send(result);
    });

};

exports.signIn =  async (req, res) => {
    let email = req.body.email.trim().toLowerCase();
    let user =  await models.User.findOne({ email: email})
        if (!user){
            res.status(500).json({ message: "User not found"});
        }
        let valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            res.status(500).json({ message: "Wrong password"});

        };
        res.send(jwt.sign({ _id: user._id }, process.env.JWT_SECRET));
        
};

