const Student = require('../models/studentModel')
const Class = require('../models/classModel')

exports.getAllStudents = async (req, res, next) => {
  let successMessage = req.flash('success')
  let errorMessage = req.flash('error')
  const allStudents = await Student.getAllStudents()
  const allClasses = await Class.getAllClasses()
  const allClassID = await Class.getMaLop();
  res.render('student/student', {
    pageTitle: 'Danh Sách Sinh Viên',
    path: '/student',
    allStudents: allStudents,
    allClasses: allClasses,
    allClassID: allClassID,
    errorMessage: errorMessage.length > 0 ? errorMessage[0] : null,
    successMessage: successMessage.length > 0 ? successMessage[0] : null,
    editing: false
  })
}

exports.addStudent = async (req, res, next) => {
  const maSinhVien = req.body.maSinhVien
  const hoTen = req.body.hoTen
  const soDienThoai = req.body.soDienThoai
  const maLop = req.body.maLop
  const gioiTinh = req.body.gioiTinh

  try {
    await Student.addStudent(maSinhVien, hoTen, soDienThoai, maLop, gioiTinh)
    req.flash('success', 'Thêm sinh viên thành công!')
    res.redirect('/student')
  } catch (err) {
    console.log(err)
  }
}

exports.deleteStudent = async (req, res, next) => {
  const maSinhVien = req.body.maSinhVien
  try {
    const isStudent = await Student.checkStudent(maSinhVien)
    if (isStudent.length > 0) {
      req.flash('error', 'Không thể xóa sinh viên đang thuê phòng')
      res.redirect('/student')
    }
    await Student.deleteStudent(maSinhVien)
    req.flash('success', 'Xóa sinh viên thành công!')
    res.redirect('/student')
  } catch (err) {
    console.log(err)
  }
}

exports.getEditStudent = async (req, res, next) => {
  const editMode = req.query.edit
  const maSinhVien = req.params.maSinhVien
  try {
    const editStudent = await Student.getStudent(maSinhVien)
    const allStudents = await Student.getAllStudents()
    const allClassID = await Class.getMaLop();
    res.render('student/student', {
      pageTitle: 'Chỉnh Sửa Thông Tin Sinh Viên',
      path: '/student',
      allStudents: allStudents,
      editStudent: editStudent[0],
      allClassID: allClassID,
      editing: editMode,
      errorMessage: null,
      successMessage: null
    })
  } catch (err) {
    console.log(err)
  }
}

exports.updateStudent = async (req, res, next) => {
  const maSinhVien = req.body.maSinhVien
  const hoTen = req.body.hoTen
  const soDienThoai = req.body.soDienThoai
  const maLop = req.body.maLop
  const gioiTinh = req.body.gioiTinh

  try {
    await Student.updateStudent(maSinhVien, hoTen, soDienThoai, maLop, gioiTinh)
    req.flash('success', 'Cập nhật thông tin sinh viên thành công!')
    res.redirect('/student')
  } catch (err) {
    console.log(err)
  }
}
