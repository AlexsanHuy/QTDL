const Utility = require('../models/utilityModel')
const Rental = require('../models/rentalModel')
const Payment = require('../models/paymentModel')
exports.getAllUtilities = async (req, res, next) => {
    let successMessage = req.flash('success')
    let errorMessage = req.flash('error')
    const allUtilities = await Utility.getAllUtilities()
    const getRoomPayment = await Payment.getRoomPayment()
    res.render('utility/utility', {
        pageTitle: 'Hóa đơn',
        path: '/utility',
        allUtilities: allUtilities,
        getRoomPayment: getRoomPayment,
        errorMessage: errorMessage.length > 0 ? errorMessage[0] : null,
        successMessage: successMessage.length > 0 ? successMessage[0] : null,
        editing: false
    })
}
exports.addUtility = async (req, res, next) => {
    const maPhong = req.body.maPhong;
    const thangNam = req.body.thangNam;
    const soTienDien = req.body.soTienDien;
    const soTienNuoc = req.body.soTienNuoc;
    const tienConLai = req.body.tienConLai;
    const ngayDong = req.body.ngayDong;
    try {
        await Utility.addUtility(maPhong,thangNam, soTienDien, soTienNuoc, tienConLai, ngayDong);
        req.flash('success', 'Thêm hóa đơn điện nước thành công')
        res.redirect('/utility')
    } catch (err) {
        console.log(err)
        req.flash('error', 'Đã xảy ra lỗi khi thêm hóa đơn điện nước')
        res.redirect('/utility')
    }
}
exports.getEditUtility = async (req, res, next) => {
    const editmode = req.query.edit;
    const maDienNuoc = req.params.MaDienNuoc;
    try {
        const getRoomPayment = await Payment.getRoomPayment()
        const editUtility = await Utility.getUtilityByMaDienNuoc(maDienNuoc);
        const allUtilities = await Utility.getAllUtilities();
        res.render('utility/utility', {
            pageTitle: 'Chỉnh sửa hóa đơn',
            path: '/utility',
            successMessage: null,
            errorMessage: null,
            allUtilities: allUtilities,
            getRoomPayment: getRoomPayment,
            editUtility: editUtility[0],
            editing: editmode
        });
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateUtility = async (req, res, next) => {
    const maDienNuoc = req.body.maDienNuoc;
    const maPhong = req.body.maPhong;
    const thangNam = req.body.thangNam;
    const soTienDien = req.body.soTienDien;
    const soTienNuoc = req.body.soTienNuoc;
    const tienConLai = req.body.tienConLai;
    const ngayDong = req.body.ngayDong;
    try {
        await Utility.updateUtility(maDienNuoc, maPhong, thangNam, soTienDien, soTienNuoc, tienConLai, ngayDong);
        req.flash('success', 'Cập nhật hóa đơn điện nước thành công')
        res.redirect('/utility')
    } catch (err) {
        console.log(err)
        req.flash('error', 'Đã xảy ra lỗi khi cập nhật hóa đơn điện nước')
        res.redirect('/utility')
    }
}
exports.deleteUtility = async (req, res, next) => {
    const maDienNuoc = req.body.maDienNuoc;
    try {
        await Utility.deleteUtility(maDienNuoc);
        req.flash('success', 'Xóa hóa đơn điện nước thành công')
        res.redirect('/utility')
    } catch (err) {
        console.log(err)
        req.flash('error', 'Đã xảy ra lỗi khi xóa hóa đơn điện nước')
        res.redirect('/utility')
    }
}


exports.updatePaymentStatus = async (req, res, next) => {
    const { maDienNuoc } = req.body;
    successmessage = req.flash('success');
    errormessage = req.flash('error');
    try {
        await Utility.updatePaymentStatus(maDienNuoc);
        res.status(200).json({ message: 'Cập nhật thanh toán thành công' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật thanh toán' });
    }
};
