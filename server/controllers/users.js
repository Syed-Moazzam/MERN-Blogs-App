const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Blog = require('../models/Blog');

exports.getUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById({ _id: decodedToken?._id });
        res.send({ status: 'success', data: user });
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (req.body.password) {
            const encryptedPass = await bcrypt.hash(req.body.password, 10);
            req.body.password = encryptedPass;
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: decodedToken?._id }, { $set: req.body }, { new: true });
        const { password, ...userWithoutPwd } = updatedUser?._doc;
        res.send({ status: 'success', data: userWithoutPwd });
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const isDeleted = await Blog.deleteMany({ authorEmail: decodedToken?.email });
        if (isDeleted) {
            await User.findByIdAndDelete({ _id: decodedToken?._id });
            res.send({ status: 'success', message: 'User deleted successfully!' });
        }
    } catch (error) {
        console.log(error.message);
    }
}