const employeeModel = require('../models/EmployeesModel');
const paymentModel = require('../models/paymentModel');
exports.getAllPayments = async (req, res) => {
  try {
    const allPayments = await paymentModel.getAllPayments();
    const allEmployeeId = await employeeModel.getEmployeeByID();
    const allContractId = await paymentModel.getContractId();
    res.render('payment/payment', {
      pageTitle: 'Tất cả thanh toán',
      allPayments,
      allEmployeeId,
      allContractId,
      editing: false,
      path: '/payment',
      searchPayment: null,
      successMessage: req.flash('successMessage'),
      errorMessage: req.flash('errorMessage'),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thanh toán:", error);
    res.status(500).send('Lỗi hệ thống');
  }
};

exports.addPayment = async (req, res) => {
  const {MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien } = req.body;
  try {
    await paymentModel.addPayment(MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien);
    req.flash('successMessage', 'Thêm thanh toán thành công!');
    res.redirect('/payment');
  } catch (error) {
    console.error('Lỗi khi thêm thanh toán:', error);
    req.flash('errorMessage', 'Lỗi khi thêm thanh toán');
    res.redirect('/payment');
  }
};

exports.deletePayment = async (req, res) => {
  const { MaHopDong } = req.params;
  try {
    await paymentModel.deletePayment(MaHopDong);
    req.flash('successMessage', 'Xóa thanh toán thành công!');
    res.redirect('/payment');
  } catch (error) {
    console.error("Lỗi khi xóa thanh toán:", error);
    req.flash('errorMessage', 'Lỗi khi xóa thanh toán');
    res.redirect('/payment');
  }
};

exports.updatePayment = async (req, res) => {
  const MaHopDong = req.body.MaHopDong;
  const ThangNam = req.body.ThangNam;
  const SoTien = req.body.SoTien;
  const NgayThanhToan = req.body.NgayThanhToan;
  const MaNhanVien = req.body.MaNhanVien;
  try {
    await paymentModel.updatePayment(MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien);
    req.flash('successMessage', 'Cập nhật thanh toán thành công!');
    res.redirect('/payment');
  } catch (error) {
    console.error("Lỗi khi cập nhật thanh toán:", error);
    req.flash('errorMessage', 'Lỗi khi cập nhật thanh toán');
    res.redirect('/payment');
  }
};

exports.editPayment = async (req, res) => {
  const editing = req.query.edit;
  const { MaHopDong } = req.params;
  try {
    const allContractId = await paymentModel.getContractId();
    const editTT_ThuePhong = await paymentModel.getPaymentByContractId(MaHopDong);
    const allEmployeeId = await employeeModel.getEmployeeByID();
    if (!editTT_ThuePhong) {
      req.flash('errorMessage', 'Không tìm thấy thông tin thanh toán');
      return res.redirect('/payment');
    }
    const allPayments = await paymentModel.getAllPayments();
    res.render('payment/payment', {
      pageTitle: 'Chỉnh sửa thanh toán',
      allPayments,
      editTT_ThuePhong,
      allEmployeeId,
      allContractId,
      editing,
      path: '/payment',
      searchPayment: null,
      successMessage: req.flash('successMessage'),
      errorMessage: req.flash('errorMessage'),
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa thanh toán:", error);
    req.flash('errorMessage', 'Lỗi khi chỉnh sửa thanh toán');
    res.redirect('/payment');
  }
};

exports.searchPayment = async (req, res) => {
  const { MaHopDongSearch, MaSoSinhVien } = req.query;
  let allPayments = [];
  let errorMessage = '';
  try {
    if (MaHopDongSearch) {
      allPayments = await paymentModel.getPaymentByContractId(MaHopDongSearch);
    } else if (MaSoSinhVien) {
      allPayments = await paymentModel.getPaymentByStudentId(MaSoSinhVien);
    } else {
      errorMessage = 'Vui lòng nhập Mã Hợp Đồng hoặc Mã Số Sinh Viên để tìm kiếm.';
    }
    res.render('payment/payment', {
      pageTitle: 'Thanh toán',
      path: '/payment',
      allPayments: allPayments,
      searchPayment: { MaHopDongSearch, MaSoSinhVien },
      successMessage: '',
      errorMessage: errorMessage,
      editing: false,
    });
    req.flash('successMessage', 'Tìm kiếm thanh toán thành công!');
  } catch (error) {
    console.error("Lỗi khi tìm kiếm thanh toán:", error);
    req.flash('errorMessage', 'Lỗi khi tìm kiếm thanh toán');
    res.redirect('/payment');
  }
};