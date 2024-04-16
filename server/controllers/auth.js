const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body?.email });
        if (user) {
            return res.send({ status: 'error', message: "User Already Exists!" });
        }
        else {
            const encryptedPass = await bcrypt.hash(req.body?.password, 10);
            const newUser = await User.create({
                username: req.body?.username,
                email: req.body?.email,
                password: encryptedPass
            });

            const { password, ...userWithoutPwd } = newUser?._doc;
            return res.send({ status: 'success', data: userWithoutPwd });
        }
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body?.email });
        if (!user) {
            return res.send({ status: 'error', message: 'User Does Not Exist!' });
        }
        else {
            const password = await bcrypt.compare(req.body?.password, user?.password);
            if (password) {
                const token = jwt.sign({
                    _id: user?._id,
                    profileImg: user?.profileImg,
                    username: user?.username,
                    email: user?.email
                }, process.env.JWT_SECRET_KEY);

                res.cookie('access_token', token, { httpOnly: false, secure: false, maxAge: 2700000 }).send({ status: 'success', message: 'Logged In Successfully!' });
            }
            else {
                return res.send({ status: 'error', message: 'Incorrect Password!' });
            }
        }
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('access_token').send({ status: 'success', message: 'Logged Out Successfully!' });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}