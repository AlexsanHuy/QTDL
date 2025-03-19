const Rental = require('../models/rentalModel')
const Room = require('../models/roomModel')
const Student = require('../models/studentModel');
const Employees = require('../models/EmployeesModel');
const e = require('express');

exports.getAllRentals = async (req, res, next) => {
    let successMessage = req.flash('success');
    let errorMessage = req.flash('error');
    const allRentals = await Rental.getAllRentals()
    const allRooms = await Room.getAllrooms()
    const allStudents = await Student.getAllStudents()
    res.render('rental/rental', {
        pageTitle: 'Thông tin thuê phòng',
        path: '/rental',
        allRentals: allRentals,
        allRooms: allRooms,
        allStudents: allStudents,
        searchMaHopDong: '',
        searchMaSinhVien: '',
        searchMaPhong: '',
        successMessage: successMessage.length > 0 ? successMessage[0] : null,
        errorMessage: errorMessage.length > 0 ? errorMessage[0] : null,
        editing: false
    })
}
exports.addRental = async (req, res, next) => {
    const MaSinhVien = req.body.maSinhVien
    const MaPhong = req.body.maPhong
    const BatDau = req.body.batDau
    const KetThuc = req.body.ketThuc
    const Gia = req.body.gia
    try {
        const checkRental = await Rental.checkRental(MaPhong)
        const getRoom = await Room.getRoom(MaPhong)
        if(checkRental.length == getRoom[0].SoGiuong){
            req.flash('error', 'Phòng đã đầy')
            res.redirect('/rental')
        }else{
            await Rental.addRental(MaSinhVien, MaPhong, BatDau, KetThuc, Gia)
            req.flash('success', 'Thêm thành công!')
            res.redirect('/rental')
        }
    } catch (error) {
            console.error('Lỗi khi thêm:', error.sqlMessage)
        req.flash('error', error.sqlMessage)
        res.redirect('/rental')
    }
}
exports.deleteRental = async (req, res, next) => {
    const MaHopDong = req.body.maHopDong
    try {
        await Rental.deleteRental(MaHopDong)
        req.flash('success', 'Xóa thành công!')
        res.redirect('/rental')
    } catch (error) {
        console.error('Lỗi khi xóa:', error)
        req.flash('error', 'Lỗi khi xóa')
        res.redirect('/rental')
    }
}
exports.getEditRental = async (req, res, next) => {
    const MaHopDong = req.params.maHopDong
    const editMode = req.query.edit
    const allRentals = await Rental.getAllRentals()
    const allRooms = await Room.getAllrooms()
    const allStudents = await Student.getAllStudents()
    const getRental = await Rental.getRental(MaHopDong)
    const allEmployees = await Employees.getAllEmployees()
    res.render('rental/rental', {
        pageTitle: 'Chỉnh sửa thông tin thuê phòng',
        path : '/rental',
        allRentals: allRentals,
        allRooms: allRooms,
        allStudents: allStudents,
        editRental: getRental[0],
        allEmployees: allEmployees,
        searchMaHopDong: '',
        searchMaSinhVien: '',
        successMessage: null,
        errorMessage: null,
        searchMaPhong: '',
        editing: editMode,
        successMessage: null
    })
}
exports.updateRental = async (req, res, next) => {
    const MaHopDong = req.body.maHopDong
    const MaSinhVien = req.body.maSinhVien
    const MaPhong = req.body.maPhong
    const BatDau = req.body.batDau
    const KetThuc = req.body.ketThuc
    const Gia = req.body.gia
    try {
        await Rental.updateRental(MaHopDong, MaSinhVien, MaPhong, BatDau, KetThuc, Gia)
        req.flash('success', 'Cập nhật thành công!')
        res.redirect('/rental')
    } catch (error) {
        console.error('Lỗi khi cập nhật:', error)
        req.flash('error', 'Lỗi khi cập nhật')
        res.redirect('/rental')
    }
}
exports.searchRental = async (req, res, next) => {
    try{
        const searchMaHopDong = req.query.searchMaHopDong || ''
        const searchMaSinhVien = req.query.searchMaSinhVien || ''
        const searchMaPhong = req.query.searchMaPhong || ''
        const allRentals = await Rental.searchRental(searchMaHopDong, searchMaSinhVien, searchMaPhong)
        const allRooms = await Room.getAllrooms()
        const allStudents = await Student.getAllStudents()
        res.render('rental/rental', {
            pageTitle: 'Thông tin thuê phòng',
            path: '/rental',
            allRentals: allRentals,
            allRooms: allRooms,
            allStudents: allStudents,
            searchMaHopDong: searchMaHopDong,
            searchMaSinhVien: searchMaSinhVien,
            searchMaPhong: searchMaPhong,
            successMessage: null,
            errorMessage: null,
            editing: false
        })
    }catch (error) {
        req.flash('error', 'Lỗi khi tìm kiếm')
        res.redirect('/rental')
    }
}
