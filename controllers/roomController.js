const Room = require('../models/roomModel')
const Rental = require('../models/rentalModel')
const Utility = require('../models/utilityModel')
const Class = require('../models/classModel')
const TT_ThuePhong = require('../models/TT_ThuePhong')
exports.getAllRooms = async (req, res, next) => {
  let successMessage = req.flash('success')
  let errorMessage = req.flash('error')
  const allRooms = await Room.getAllrooms()
  res.render('room/room', {
    pageTitle: 'Phòng',
    path: '/room',
    allRooms: allRooms,
    errorMessage: errorMessage.length > 0 ? errorMessage[0] : null,
    successMessage: successMessage.length > 0 ? successMessage[0] : null,
    editing: false
  })
}

exports.addRoom = async (req, res, next) => {
  const maPhong = req.body.maPhong
  const tenPhong = req.body.tenPhong
  const dienTich = req.body.dienTich
  const soGiuong = req.body.soGiuong
  const giaThue = req.body.giaThue
  const loaiPhong = req.body.phongNamNu

  try {
    await Room.addRoom(maPhong,tenPhong,dienTich,soGiuong,giaThue,loaiPhong)
    req.flash('success', 'Thêm phòng thành công!')
    res.redirect('/room')
  } catch(err) {
    console.log(err)
  }
}

exports.deleteRoom = async (req, res, next) => {
  const maPhong = req.body.maPhong
  try {
    const isRoom = await Room.checkRoom(maPhong)
    if(isRoom.length > 0) {
      req.flash('error', 'Không thể xóa vì phòng đang được thuê!')
      res.redirect('/room')
    }
    await Room.deleteRoom(maPhong)
    req.flash('success', 'Xóa phòng thành công!')
    res.redirect('/room')
  } catch(err) {
    console.log(err)
  }
}

exports.getEditRoom = async (req, res, next) => {
  const editmode = req.query.edit
  const maPhong = req.params.maPhong
  try {
    const editRoom = await Room.getRoom(maPhong)
    const allRooms = await Room.getAllrooms()
    res.render('room/room', {
      pageTitle: 'Chỉnh sửa phòng',
      path: '/room',
      allRooms: allRooms,
      editRoom: editRoom[0],
      editing: editmode,
      errorMessage: null,
      successMessage: null
    })
  } catch(err) {
    console.log(err)
  }
}

exports.updateRoom = async(req, res, next) => {
  const maPhong = req.body.maPhong
  const tenPhong = req.body.tenPhong
  const dienTich = req.body.dienTich
  const soGiuong = req.body.soGiuong
  const giaThue = req.body.giaThue
  const loaiPhong = req.body.phongNamNu
  
  try {
    await Room.updateRoom(maPhong, tenPhong, dienTich, soGiuong, giaThue, loaiPhong)
    req.flash('success', 'Sửa thông tin phòng thành công')
    res.redirect('/room')
  } catch(err) {
    console.log(err)
  }
}

exports.searchRoom = async(req, res, next) => {
  const maPhong = req.body.maPhong
  const tenPhong = req.body.tenPhong

  try {
    const rooms = await Room.searchRoom(maPhong, tenPhong)
    res.render('room/room', {
      pageTitle: 'Phòng',
      path: '/room',
      allRooms: rooms,
      errorMessage: null,
      successMessage: null,
      editing: false
    })
  } catch(err) {
    console.log(err)
  }
}
exports.getRoomInfo = async (req, res, next) => {

  try{
    const student = req.session.student ? req.session.student[0] : null;
    successMessage = req.flash('success');
    errorMessage = req.flash('error');
    if(!student){
      req.flash('error', 'Vui lòng đăng nhập trước!');
      return res.redirect('/loginstudent');
    }
    const MaSinhVien = student.MaSinhVien;
    const rental = await Rental.getRentalByMSSV(MaSinhVien);
    if(rental.length === 0){
      req.flash('error', 'Bạn chưa thuê phòng nào!');
      return res.redirect('/loginstudent');
    }
    const payment = await TT_ThuePhong.getTT_ThuePhongByMaHopDong(rental[0].MaHopDong);
    if(payment.NgayThanhToan == null){
      req.flash('error', 'Bạn chưa thanh toán phòng!');
      return res.redirect('/loginstudent');
    }
    const room = await Room.getRoomByMaPhong(rental[0].MaPhong);
    const utilities = await Utility.getUtilityByMaPhong(rental[0].MaPhong);
    const className = await Class.getClassName(student.MaLop);
    res.render('room/roominfo', {
      pageTitle: 'Thông tin phòng',
      path: '/roominfo',
      student: student,
      className: className,
      room: room[0],
      rental: rental[0],
      utilities: utilities,
      errorMessage: errorMessage.length > 0 ? errorMessage[0] : null,
      successMessage: successMessage.length > 0 ? successMessage[0] : null,
      editing: false
    });
  }
  catch(err){
    console.log(err)
  }

}

exports.getStudent = async (req, res, next) => {
  const maPhong = req.params.maPhong
  try {
    const students = await Room.getStudent(maPhong)
    res.json(students)
  } catch(err) {
    console.log(err)
  }
}
