import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        // Extract the token from the cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the officer ID to the request object
        req.userId = decoded.id;
        req.role=decoded.role;
        // Call next middleware
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
