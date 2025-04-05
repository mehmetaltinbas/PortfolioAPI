import jwt from 'jsonwebtoken';

export default function authMiddleware(req, res, next) {
    console.log('AuthMiddleware is called');
    const cookie = req.cookies.jwt || req.cookies._vercel_jwt
    const token = cookie || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log(`Token: ${token}`);
    console.log(`Cookie: ${cookie}`);
    console.log(`Authorization Header: ${req.headers.authorization}`);

    if (!token) return res.json({ isSuccess: false, message: "Unauthorized: No token provided" });

    jwt.verify(token, process.env.JWT_SIGNATURE, (err, decoded) => {
        if (err) return res.json({ isSuccess: false, message: "Forbidden: Invalid token" });

        req.user = decoded;
        next();
    });
}