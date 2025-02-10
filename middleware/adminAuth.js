
function adminMiddleware(req, res, next) {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Not an admin.' });
        }
        req.user = decoded; 
        next();
    });
}

export default adminMiddleware;