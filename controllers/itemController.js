const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
    // Hanya menampilkan data yang is_active = 1 (true) [cite: 24]
    const items = await Item.findAll({ where: { is_active: true } });
    res.render('dashboard', { items, user: req.user });
};

exports.createItemPage = (req, res) => {
    res.render('form', { item: null, user: req.user });
};

exports.createItem = async (req, res) => {
    const { item_name, category, price, stock_qty, min_stock, storage_location } = req.body;
    
    // Audit Trail: created_by diambil otomatis dari req.user.username [cite: 20, 43]
    // is_active diset default true [cite: 44]
    await Item.create({
        item_name, category, price, stock_qty, min_stock, storage_location,
        created_by: req.user.username,
        is_active: true
    });
    res.redirect('/items');
};

exports.editItemPage = async (req, res) => {
    const item = await Item.findByPk(req.params.id);
    res.render('form', { item, user: req.user });
};

exports.updateItem = async (req, res) => {
    const { item_name, category, price, stock_qty, min_stock, storage_location } = req.body;

    // Audit Trail: updated_by diambil otomatis dari req.user.username [cite: 20, 45]
    // updated_at otomatis dihandle Sequelize [cite: 45]
    await Item.update({
        item_name, category, price, stock_qty, min_stock, storage_location,
        updated_by: req.user.username
    }, {
        where: { id: req.params.id }
    });
    res.redirect('/items');
};

exports.softDeleteItem = async (req, res) => {
    // Soft Delete: Mengubah is_active menjadi 0 (false), bukan DELETE SQL [cite: 23, 46]
    await Item.update({ is_active: false }, {
        where: { id: req.params.id }
    });
    res.redirect('/items');
};