const Room = require('../models/roomModel')
const Rental = require('../models/rentalModel')
const Payment = require('../models/paymentModel')
const Utility = require('../models/utilityModel')
exports.getDashboard =  async (req, res, next) => {
    let errorMessage = req.flash('error')
    let successMessage = req.flash('success')
    const totalRooms = await Room.getTotalRoom()
    const totalStudentsWithPayment = await Payment.getTotalStudentsWithPayment()
    const totalRevenue = await Payment.getTotalRevenue()
    const totalUtility = await Utility.getTotalUtility()
    const totalRevenueByMonth = await Utility.getUtilityRevenueByMonth()
    res.render('dashboard/dashboard', {
        pageTitle: 'Quản lý ký túc xá',
        path : '/dashboard',
        totalRooms: totalRooms,
        totalStudentsWithPayment: totalStudentsWithPayment,
        totalRevenue: totalRevenue,
        totalUtility: totalUtility,
        totalRevenueByMonth: totalRevenueByMonth,
        errorMessage: errorMessage[0],
        successMessage: successMessage[0]
    })
}
