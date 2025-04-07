import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { getServices, createService, updateService, deleteService } from '../services/serviceService'
import './Services.css'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [currentService, setCurrentService] = useState({
    name: '',
    price: '',
    duration: '',
    description: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const data = await getServices()
      setServices(data)
      setLoading(false)
    } catch (error) {
      toast.error('Failed to fetch services')
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentService({
      ...currentService,
      [name]: value
    })
  }

  const handleAddClick = () => {
    setCurrentService({
      name: '',
      price: '',
      duration: '',
      description: ''
    })
    setIsEditing(false)
    setShowModal(true)
  }

  const handleEditClick = (service) => {
    setCurrentService({
      ...service,
      price: service.price.toString(),
      duration: service.duration.toString()
    })
    setIsEditing(true)
    setShowModal(true)
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id)
        setServices(services.filter(service => service._id !== id))
        toast.success('Service deleted successfully')
      } catch (error) {
        toast.error('Failed to delete service')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!currentService.name || !currentService.price || !currentService.duration || !currentService.description) {
      toast.error('Please fill all fields')
      return
    }

    try {
      const serviceData = {
        ...currentService,
        price: parseFloat(currentService.price),
        duration: parseInt(currentService.duration, 10)
      }

      if (isEditing) {
        const updatedService = await updateService(currentService._id, serviceData)
        setServices(services.map(service => 
          service._id === updatedService._id ? updatedService : service
        ))
        toast.success('Service updated successfully')
      } else {
        const newService = await createService(serviceData)
        setServices([...services, newService])
        toast.success('Service created successfully')
      }
      
      setShowModal(false)
    } catch (error) {
      toast.error(isEditing ? 'Failed to update service' : 'Failed to create service')
    }
  }

  return (
    <div className="services-container">
      <div className="services-header">
        <h1 className="page-title">Salon Services</h1>
        <button className="btn btn-primary add-btn" onClick={handleAddClick}>
          <FaPlus /> Add New Service
        </button>
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="services-grid">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service._id} className="service-item">
                <div className="service-item-header">
                  <h3>{service.name}</h3>
                  <div className="service-actions">
                    <button 
                      className="btn-icon edit-btn" 
                      onClick={() => handleEditClick(service)}
                      aria-label="Edit service"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn-icon delete-btn" 
                      onClick={() => handleDeleteClick(service._id)}
                      aria-label="Delete service"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="service-price">${service.price.toFixed(2)}</div>
                <div className="service-duration">{service.duration} min</div>
                <p className="service-description">{service.description}</p>
              </div>
            ))
          ) : (
            <p className="no-services">No services available. Add a new service to get started.</p>
          )}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">{isEditing ? 'Edit Service' : 'Add New Service'}</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Service Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentService.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. Haircut"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price ($)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={currentService.price}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. 25.99"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (minutes)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={currentService.duration}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. 30"
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={currentService.description}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Describe the service..."
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Services