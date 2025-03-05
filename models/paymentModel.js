const db = require('../config/database');

const Payment = {
  getAllPayments: async function () {
    const sql = 'SELECT * FROM TT_ThuePhong';
    const [result] = await db.query(sql);
    return result;
  },

  getContractId: async function () {
    const sql = 'SELECT MaHopDong FROM thuephong';
    const [result] = await db.query(sql);
    return result;
  },

  getPaymentByContractId: async function (MaHopDong) {
    const sql = 'SELECT * FROM TT_ThuePhong WHERE MaHopDong = ?';
    const [result] = await db.query(sql, [MaHopDong]);
    return result.length > 0 ? result[0] : null;
  },

  getPaymentByStudentId: async function (MaSinhVien) {
    const sql = 'SELECT * FROM TT_ThuePhong WHERE MaSinhVien = ?';
    const [result] = await db.query(sql, [MaSinhVien]);
    return result;
  },

  deletePayment: async function (MaHopDong) {
    const sql = 'DELETE FROM TT_ThuePhong WHERE MaHopDong = ?';
    const [result] = await db.query(sql, [MaHopDong]);
    return result;
  },

  addPayment: async function (MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien) {
    const sql = 'INSERT INTO TT_ThuePhong (MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien]);
    return result;
  },

  updatePayment: async function (MaHopDong, ThangNam, SoTien, NgayThanhToan, MaNhanVien) {
    const sql = 'UPDATE TT_ThuePhong SET ThangNam = ?, SoTien = ?, NgayThanhToan = ?, MaNhanVien = ? WHERE MaHopDong = ?';
    const [result] = await db.query(sql, [ThangNam, SoTien, NgayThanhToan, MaNhanVien, MaHopDong]);
    return result;
  },

  searchPayment: async function (searchMaHopDong, searchThangNam, searchSoTien, searchNgayThanhToan, searchMaNhanVien) {
    const sql = 'SELECT * FROM TT_ThuePhong WHERE MaHopDong LIKE ? AND ThangNam LIKE ? AND SoTien LIKE ? AND NgayThanhToan LIKE ? AND MaNhanVien LIKE ?';
    const [result] = await db.query(sql, [searchMaHopDong, searchThangNam, searchSoTien, searchNgayThanhToan, searchMaNhanVien]);
    return result;
  },

    getTotalRevenue: async function () {
    const sql = 'SELECT SUM(SoTien) AS totalRevenue FROM TT_ThuePhong WHERE NgayThanhToan IS NOT NULL';
    const [result] = await db.query(sql);
    return result[0].totalRevenue;
  },
  getTotalStudentsWithPayment: async function () {
    const sql = `
      SELECT COUNT(DISTINCT tp.MaSinhVien) AS totalStudents
      FROM TT_ThuePhong tt
      JOIN ThuePhong tp ON tt.MaHopDong = tp.MaHopDong
      WHERE tt.NgayThanhToan IS NOT NULL
    `;
    const [rows] = await db.query(sql);
    return rows[0]?.totalStudents || 0;
  }, 
  getRoomPayment: async function () {
    const sql = `
  SELECT 
    tp.MaPhong, 
    ttp.MaHopDong, 
    ttp.ThangNam, 
    ttp.SoTien, 
    ttp.NgayThanhToan, 
    ttp.MaNhanVien
  FROM 
    TT_ThuePhong ttp
  JOIN 
    ThuePhong tp ON ttp.MaHopDong = tp.MaHopDong
  WHERE 
    ttp.NgayThanhToan IS NOT NULL;
    `;
    const [rows] = await db.query(sql);
    return rows;
  }
};

module.exports = Payment;
