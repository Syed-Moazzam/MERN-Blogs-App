const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Forbidden' });
    }
};

module.exports = authenticateToken;
