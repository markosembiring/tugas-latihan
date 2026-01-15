const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Mengambil token dari cookie

    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, 'rahasia_negara'); // Secret key sederhana
        req.user = decoded; // Menyimpan payload (username, role) ke req.user [cite: 20]
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.redirect('/login');
    }
};

const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).send('Akses Ditolak: Anda tidak memiliki izin.');
        }
        next();
    };
};

module.exports = { verifyToken, verifyRole };