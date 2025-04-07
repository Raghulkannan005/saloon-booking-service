import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaCalendarPlus, FaEdit, FaTrash } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getBookings, createBooking, updateBooking, deleteBooking } from '../services/bookingService'
import { getServices } from '../services/serviceService'
import './Bookings.css'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentBooking, setCurrentBooking] = useState({
    customerName: '',
    phone: '',
    selectedService: '',
    date: new Date()
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchBookings()
    fetchServices()
  }, [])

  const fetchBookings = async () => {
    try {
      const data = await getBookings()
      setBookings(data)
      setLoading(false)
    } catch (error) {
      toast.error('Failed to fetch bookings')
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      const data = await getServices()
      setServices(data)
    } catch (error) {
      toast.error('Failed to fetch services')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentBooking({
      ...currentBooking,
      [name]: value
    })
  }

  const handleDateChange = (date) => {
    setCurrentBooking({
      ...currentBooking,
      date
    })
  }

  const handleAddClick = () => {
    setCurrentBooking({
      customerName: '',
      phone: '',
      selectedService: services.length > 0 ? services[0]._id : '',
      date: new Date()
    })
    setIsEditing(false)
    setShowModal(true)
  }

  const handleEditClick = (booking) => {
    setCurrentBooking({
      ...booking,
      selectedService: booking.selectedService._id,
      date: new Date(booking.date)
    })
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(id)
        setBookings(bookings.filter(booking => booking._id !== id))
        toast.success('Booking deleted successfully')
      } catch (error) {
        toast.error('Failed to delete booking')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!currentBooking.customerName || !currentBooking.phone || !currentBooking.selectedService) {
      toast.error('Please fill all fields')
      return
    }

    try {
      if (isEditing) {
        const updatedBooking = await updateBooking(currentBooking._id, currentBooking)
        setBookings(bookings.map(booking => 
          booking._id === updatedBooking._id ? updatedBooking : booking
        ))
        toast.success('Booking updated successfully')
      } else {
        const newBooking = await createBooking(currentBooking)
        setBookings([...bookings, newBooking])
        toast.success('Booking created successfully')
      }
      
      setShowModal(false)
    } catch (error) {
      toast.error(isEditing ? 'Failed to update booking' : 'Failed to create booking')
    }
  }

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h1 className="page-title">Appointment Bookings</h1>
        <button className="btn btn-primary add-btn" onClick={handleAddClick}>
          <FaCalendarPlus /> New Booking
        </button>
      </div>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="bookings-list">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3 className="customer-name">{booking.customerName}</h3>
                  <div className="booking-actions">
                    <button 
                      className="btn-icon edit-btn" 
                      onClick={() => handleEditClick(booking)}
                      aria-label="Edit booking"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon delete-btn" 
                      onClick={() => handleDeleteClick(booking._id)}
                      aria-label="Delete booking"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="booking-info">
                  <div className="booking-detail">
                    <span className="label">Phone:</span>
                    <span>{booking.phone}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="label">Service:</span>
                    <span>{booking.selectedService.name}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="label">Price:</span>
                    <span>${booking.selectedService.price.toFixed(2)}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="label">Duration:</span>
                    <span>{booking.selectedService.duration} min</span>
                  </div>
                  <div className="booking-detail">
                    <span className="label">Date & Time:</span>
                    <span>{formatDate(booking.date)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-bookings">No bookings available. Create a new booking to get started.</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{isEditing ? 'Edit Booking' : 'New Booking'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="customerName">Customer Name</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={currentBooking.customerName}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={currentBooking.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="selectedService">Select Service</label>
                <select
                  id="selectedService"
                  name="selectedService"
                  value={currentBooking.selectedService}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service._id} value={service._id}>
                      {service.name} (${service.price.toFixed(2)}, {service.duration} min)
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date & Time</label>
                <DatePicker
                  selected={currentBooking.date}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="form-control"
                  minDate={new Date()}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Booking' : 'Create Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings