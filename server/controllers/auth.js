const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body?.email });
        if (user) {
            res.send({ status: 'error', message: "User Already Exists!" });
        }
        else {
            const encryptedPass = await bcrypt.hash(req.body?.password, 10);
            const newUser = await User.create({
                username: req.body?.username,
                email: req.body?.email,
                password: encryptedPass
            });

            const { password, ...userWithoutPwd } = newUser?._doc;
            res.send({ status: 'success', data: userWithoutPwd });
        }
    } catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body?.email });
        if (user) {
            const password = await bcrypt.compare(req.body?.password, user?.password);
            if (password) {
                const token = jwt.sign({
                    _id: user?._id,
                    username: user?.username,
                    email: user?.email
                }, process.env.JWT_SECRET_KEY);

                res.cookie('token', token, { httpOnly: false, secure: false, maxAge: 1800000 }).send({ status: 'success', message: 'Logged In Successfully!' });
            }
            else {
                res.send({ status: 'error', message: 'Incorrect Password!' });
            }
        }
        else {
            res.send({ status: 'error', message: 'Incorrect Email!' });
        }
    } catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token').send({ status: 'success', message: 'Logged Out Successfully!' });
    } catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}