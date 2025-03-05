const db = require('../config/database');

const Employees = {
  getAllEmployees: async function () {
    const sql = 'SELECT * FROM NhanVien';
    const [result] = await db.query(sql);
    return result;
  },
  getEmployeeByID: async function () {
    const sql = 'SELECT MaNhanVien FROM NhanVien';
    const [result] = await db.query(sql);
    return result;
  },

  getEmployee: async function (maNhanVien) {
    const sql = 'SELECT * FROM NhanVien WHERE MaNhanVien = ?';
    const [result] = await db.query(sql, [maNhanVien]);
    return result;
  },

  addEmployee: async function (maNhanVien, hoTen, soDienThoai, ghiChu) {
    const sql = 'INSERT INTO NhanVien (MaNhanVien, HoTen, SoDienThoai, GhiChu) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [maNhanVien, hoTen, soDienThoai, ghiChu]);
    return result;
  },

  updateEmployee: async function (maNhanVien, hoTen, soDienThoai, ghiChu) {
    const sql = 'UPDATE NhanVien SET HoTen = ?, SoDienThoai = ?, GhiChu = ? WHERE MaNhanVien = ?';
    const [result] = await db.query(sql, [hoTen, soDienThoai, ghiChu, maNhanVien]);
    return result;
  },

  deleteEmployee: async function (maNhanVien) {
    const sql = 'DELETE FROM NhanVien WHERE MaNhanVien = ?';
    const [result] = await db.query(sql, [maNhanVien]);
    return result;
  },

  checkEmployee: async function (maNhanVien) {
    const sql = 'SELECT * FROM tt_thuephong WHERE maNhanVien = ?'
    const [result] = await db.query(sql, [maNhanVien])
    return result
  }
};

module.exports = Employees;
