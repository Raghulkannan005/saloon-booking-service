import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaScissors } from 'react-icons/fa'
import { getServices } from '../services/serviceService'
import './Home.css'

const Home = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        // Only show 3 services on the home page
        setServices(data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Glamour Salon</h1>
        <p>Experience the ultimate beauty and relaxation services</p>
        <div className="hero-buttons">
          <Link to="/bookings" className="btn btn-primary">
            <FaCalendarAlt className="btn-icon" /> Book Appointment
          </Link>
          <Link to="/services" className="btn btn-outline">
            <FaScissors className="btn-icon" /> View Services
          </Link>
        </div>
      </section>

      <section className="featured-services">
        <h2>Our Featured Services</h2>
        {loading ? (
          <p>Loading services...</p>
        ) : (
          <>
            {services.length > 0 ? (
              <div className="service-cards">
                {services.map((service) => (
                  <div key={service._id} className="service-card">
                    <h3>{service.name}</h3>
                    <div className="service-price">${service.price.toFixed(2)}</div>
                    <div className="service-duration">{service.duration} min</div>
                    <p>{service.description}</p>
                    <Link to="/bookings" className="btn btn-secondary">Book Now</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>No services available. Please check back later.</p>
            )}
            <div className="text-center mt-4">
              <Link to="/services" className="btn btn-outline">View All Services</Link>
            </div>
          </>
        )}
      </section>

      <section className="about-us">
        <h2>About Glamour Salon</h2>
        <p>
          Glamour Salon is dedicated to providing top-quality beauty services in a relaxing and welcoming environment.
          Our experienced stylists and beauticians are committed to helping you look and feel your best.
        </p>
        <p>
          We offer a wide range of services from haircuts and styling to nail care and more.
          Visit us today and experience the Glamour difference!
        </p>
      </section>
    </div>
  );
};

export default Home;