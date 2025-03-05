const express = require('express');

const router = express.Router();

const paymentController = require('../controllers/paymentController');
const isAuth = require('../middleware/isAuth');

router.get('/payment', isAuth, paymentController.getAllPayments);
router.post('/add-payment', isAuth, paymentController.addPayment);
router.post('/delete-payment/:MaHopDong', isAuth, paymentController.deletePayment);
router.post('/update-payment', isAuth, paymentController.updatePayment);
router.get('/edit-payment/:MaHopDong', isAuth, paymentController.editPayment);
router.get('/payment/search', isAuth, paymentController.searchPayment);

module.exports = router;