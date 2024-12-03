const Booking = require('../models/bookingModel');

const createBooking = async (req, res) => {
    try {
        const bookingData = req.body;
        const result = await Booking.create(bookingData);
        res.status(201).json({
            message: 'Booking created successfully',
            booking: result.ops[0]
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.getById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const bookingData = req.body;
        const result = await Booking.update(id, bookingData);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await Booking.updateStatus(id, status);
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status', error });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Booking.delete(id);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    updateBookingStatus,
    deleteBooking
};
