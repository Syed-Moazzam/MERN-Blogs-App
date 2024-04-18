const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
            return res.send({ status: 'success', message: 'Account Created Successfully!', data: userWithoutPwd });
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
                const sessionUser = {
                    _id: user?._id,
                    profileImg: user?.profileImg,
                    username: user?.username,
                    email: user?.email,
                    sessionExpirationTime: Date.now() + (45 * 60 * 1000)
                }
                req.session.user = sessionUser;
                return res.send({ status: 'success', message: 'Logged In Successfully!', data: req.session.user });
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
        req.session.destroy();
        return res.send({ status: 'success', message: 'Logged Out Successfully!' });
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}