const validateSession = (req, res, next) => {
    if (!req.session?.user) {
        return res.send({ status: 'error', message: 'Unauthorized User! Please Login Again' })
    }
    next();
}

module.exports = validateSession;