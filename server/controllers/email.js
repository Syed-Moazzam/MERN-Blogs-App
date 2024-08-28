const transporter = require('../nodemailerConfig');

exports.sendEmail = async (req, res) => {
    try {
        const { username, email, message } = req.body;
        console.log('user email', email);

        await transporter.sendMail({
            from: `${username} <${email}>`,
            to: process.env.USER,
            subject: 'Contacting Via Blogs Application',
            html: `<h2>${message}</h2>`
        });
        return res.status(200).send({ status: 'success', message: 'Message Sent Successfully!' });

    } catch (error) {
        return res.status(505).send({ status: 'error', message: error.message });
    }
}