const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

router.use(verifyToken); // Semua route di bawah ini butuh login 

// Dashboard (Semua role bisa lihat)
router.get('/', itemController.getAllItems);

// Edit (Admin Staff BOLEH melakukan edit) [cite: 30]
router.get('/edit/:id', itemController.editItemPage);
router.post('/edit/:id', itemController.updateItem);

// Tambah & Hapus (Hanya Manager) [cite: 29, 31]
router.get('/create', verifyRole(['manager']), itemController.createItemPage);
router.post('/create', verifyRole(['manager']), itemController.createItem);
router.get('/delete/:id', verifyRole(['manager']), itemController.softDeleteItem);

module.exports = router;