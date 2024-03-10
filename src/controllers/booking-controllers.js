const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.create(req.body);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created the booking",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to created the booking",
            err: error
        });
    }
}

const get = async (req, res) => {
    try {
        const response = await bookingService.get(req.params.id);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully fetched the booking",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to fetch the booking",
            err: error
        });
    }
}

const getAll = async (req, res) => {
    try {
        const response = await bookingService.getAll();
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully fetched all the bookings",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to fetch all the bookings",
            err: error
        });
    }
}

const destroy = async (req, res) => {
    try {
        const response = await bookingService.destroy(req.params.id);
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully deleted the booking",
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Failed to delete the booking",
            err: error
        });
    }
}

module.exports = {
    create,
    get,
    getAll,
    destroy
}