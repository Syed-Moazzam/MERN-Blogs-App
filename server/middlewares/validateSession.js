const validateSession = (req, res, next) => {
    if (!req.session?.user) {
        return res.send({ status: 'error', message: 'The User Is Unauthorized Or The Session Is Inactive! Please Login Again' })
    }
    next();
}

module.exports = validateSession;