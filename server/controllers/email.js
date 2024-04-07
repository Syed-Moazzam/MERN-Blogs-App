const transporter = require('../nodemailerConfig');

exports.sendEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        console.log('user email', email);

        await transporter.sendMail({
            from: `${name} <${email}>`,
            to: process.env.USER,
            subject: 'Contacting Via Blogs Application',
            html: `<h2>${message}</h2>`
        });
        res.status(200).send({ status: 'success', message: 'Email Received Successfully! We Will Contact You Shortly.' });

    } catch (error) {
        res.status(505).send({ status: 'error', message: error.message });
    }
}