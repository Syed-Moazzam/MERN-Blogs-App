const User = require('../models/User');
const Blog = require('../models/Blog');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const sessionUser = req.session.user;
        if (userId === sessionUser?._id) {
            const user = await User.findById({ _id: sessionUser?._id });
            const { password, ...userWithoutPwd } = user?._doc;
            return res.send({ status: 'success', data: userWithoutPwd });
        }
        else {
            return res.send({ status: 'error', message: "You Can Only Access Your Own Information!" });
        }
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const sessionUser = req.session.user;
        if (userId === sessionUser?._id) {
            if (req.body.password) {
                const encryptedPass = await bcrypt.hash(req.body.password, 10);
                req.body.password = encryptedPass;
            }

            const updatedUser = await User.findByIdAndUpdate({ _id: sessionUser?._id }, { $set: req.body }, { new: true });
            const { password, ...userWithoutPwd } = updatedUser?._doc;
            return res.send({ status: 'success', message: "Data Updated Successfully!", data: userWithoutPwd });
        }
        else {
            return res.send({ status: 'error', message: "You Can Only Update Your Own Information!" });
        }
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const sessionUser = req.session.user;
        if (userId === sessionUser?._id) {
            const isDeleted = await Blog.deleteMany({ authorId: sessionUser?._id });
            if (isDeleted) {
                await User.findByIdAndDelete({ _id: sessionUser?._id });
                req.session.destroy();
                return res.send({ status: 'success', message: 'Account Deleted Successfully!' });
            }
        }
        else {
            return res.send({ status: 'error', message: "You Can Only Delete Your Own Account!" });
        }
    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}