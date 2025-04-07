import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('selectedService');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('selectedService');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a booking
router.post('/', async (req, res) => {
  const booking = new Booking({
    customerName: req.body.customerName,
    phone: req.body.phone,
    selectedService: req.body.selectedService,
    date: new Date(req.body.date)
  });

  try {
    const newBooking = await booking.save();
    const populatedBooking = await Booking.findById(newBooking._id).populate('selectedService');
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    if (req.body.customerName) booking.customerName = req.body.customerName;
    if (req.body.phone) booking.phone = req.body.phone;
    if (req.body.selectedService) booking.selectedService = req.body.selectedService;
    if (req.body.date) booking.date = new Date(req.body.date);
    
    const updatedBooking = await booking.save();
    const populatedBooking = await Booking.findById(updatedBooking._id).populate('selectedService');
    res.json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    await booking.deleteOne();
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;