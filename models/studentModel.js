const db = require('../config/database');

const Student = {
  getAllStudents: async function () {
    const sql = 'SELECT * FROM SinhVien';
    const [result] = await db.query(sql);
    return result;
  },

  getStudent: async function (maSinhVien) {
    const sql = 'SELECT * FROM SinhVien WHERE MaSinhVien = ?';
    const [result] = await db.query(sql, [maSinhVien]);
    return result;
  },

  addStudent: async function (maSinhVien, hoTen, soDienThoai, maLop, gioiTinh) {
    const sql = 'INSERT INTO SinhVien (MaSinhVien, HoTen, SoDienThoai, MaLop, GioiTinh) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [
      maSinhVien,
      hoTen,
      soDienThoai,
      maLop,
      gioiTinh
    ]);
    return result;
  },

  updateStudent: async function (maSinhVien, hoTen, soDienThoai, maLop, gioiTinh) {
    const sql = 'UPDATE SinhVien SET HoTen = ?, SoDienThoai = ?, MaLop = ?, GioiTinh = ? WHERE MaSinhVien = ?';
    const [result] = await db.query(sql, [hoTen, soDienThoai, maLop, gioiTinh, maSinhVien]);
    return result;
  },

  deleteStudent: async function (maSinhVien) {
    const sql = 'DELETE FROM SinhVien WHERE MaSinhVien = ?';
    const [result] = await db.query(sql, [maSinhVien]);
    return result;
  },

  checkStudent: async function (maSinhVien) {
    const sql = 'SELECT * FROM thuephong WHERE maSinhVien = ?'
    const [result] = await db.query(sql, [maSinhVien])
    return result
  },
  findByMSSV: async function (mssv) {
    const sql = 'SELECT * FROM SinhVien WHERE MaSinhVien = ?'
    const [result] = await db.query(sql, [mssv])
    return result
  },
  getClassName: async function (maLop) {
    const sql = 'SELECT TenLop FROM Lop WHERE MaLop = ?'
    const [result] = await db.query(sql, [maLop])
    return result
  }
};

module.exports = Student;
