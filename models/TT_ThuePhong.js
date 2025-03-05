const db = require('../config/database');

const TT_ThuePhong = {
  getStudentPaymentById: async function (studentID) {
    try {
      const sql = 'CALL get_payment_by_student(?)';
      const [result] = await db.query(sql, [studentID]);
      return result[0];
    } catch (error) {
      console.error('Error fetching student payment:', error);
      throw error;
    }
  },

  getPaymentsByContractId: async function (contractID) {
    try {
      const sql = 'CALL get_payment_by_contract(?)';
      const [result] = await db.query(sql, [contractID]);
      return result[0];
    } catch (error) {
      console.error('Error fetching contract payments:', error);
      throw error;
    }
  },

  getAllPayments: async function () {
    try {
      const sql = 'SELECT * FROM TT_ThuePhong';
      const [result] = await db.query(sql);
      return result;
    } catch (error) {
      console.error('Error fetching all payments:', error);
      throw error;
    }
  },

  updatePaymentRecord: async function (contractID, thangNam, soTien, ngayThanhToan, maNhanVien) {
    try {
      const sql = 'CALL CapNhatTT_ThuePhong(?, ?, ?, ?, ?)';
      const [result] = await db.query(sql, [
        contractID,
        thangNam,
        parseInt(soTien),
        ngayThanhToan ? ngayThanhToan : null,
        maNhanVien
      ]);
      console.log('Update successful', result);
    } catch (error) {
      console.error('Error updating payment:', error);
      throw error;
    }
  },
  deletePaymentRecord: async function (contractID) {
    try {
      const sql = 'CALL delete_tt_thuephong(?)';
      const [result] = await db.query(sql, [contractID]);
      return result[0];
    } catch (error) {
      console.error('Error deleting payment record:', error);
      throw error;
    }
  },

  getPaymentById: async function (contractID) {
    try {
      const sql = 'SELECT * FROM TT_ThuePhong WHERE MaHopDong = ?';
      const [result] = await db.query(sql, [contractID]);
      return result[0];
    } catch (error) {
      console.error('Error fetching payment by MaHopDong:', error);
      throw error;
    }
  },
  getTT_ThuePhongByMaHopDong: async function (contractID) {
    try {
      const sql = 'SELECT * FROM TT_ThuePhong WHERE MaHopDong = ?';
      const [result] = await db.query(sql, [contractID]);
      return result[0];
    } catch (error) {
      console.error('Error fetching payment by MaHopDong:', error);
      throw error;
    }
  }
};

module.exports = TT_ThuePhong;