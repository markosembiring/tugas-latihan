const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    // Pengecekan sederhana (password plain text untuk simulasi dummy data)
    const user = await User.findOne({ where: { username, password } });

    if (!user) return res.send('Username atau password salah');

    // Token memuat payload username dan role 
    const token = jwt.sign({ username: user.username, role: user.role }, 'rahasia_negara', { expiresIn: '1h' });
    
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/items');
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};