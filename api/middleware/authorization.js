const jwt = require('jsonwebtoken');

const accessToken = (email, nama, username) => {
    // Secret key for signing the token
    const secretKey = 'your_secret_key';

    // Payload data (avoid including sensitive information like passwords)
    const payload = {
        // Only include the email or other non-sensitive user data
        email: email
    };

    // Token options
    const options = {
        expiresIn: '1d' // Token expires in 1 hour
    };

    // Create the token
    const token = jwt.sign(payload, secretKey, options);

    return token;
};

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            status: "Error",
            message: "Access denied. No token provided.",
        });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({
                statusCode: 403,
                status: "Error",
                message: "Invalid token.",
            });
        }
        req.user = user;
        next();
    });
};

module.exports = { accessToken, authenticateToken };
