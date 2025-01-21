import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/AdoptForm.css';
import Confetti from 'react-confetti';

const AdoptForm = () => {
  const location = useLocation();
  const dog = location.state?.dog;

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    zipcode: '',
  });

  if (!dog) {
    return <p>No dog data available for adoption</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { name: '', email: '', phone: '', zipcode: '' };

    if (!/^[a-zA-Z\s]{2,}$/.test(formValues.name)) {
      newErrors.name = 'Name must be at least 2 characters long and contain only alphabets.';
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Enter a valid email address.';
      valid = false;
    }

    if (!/^\d{10}$/.test(formValues.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number.';
      valid = false;
    }

    if (!/^\d{5}$/.test(formValues.zipcode)) {
      newErrors.zipcode = 'Zipcode must be 5 digits.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <div className="thank-you-message">
          <Confetti />
          <h2>Thank you for your application!</h2>
          <p>We have received your application and will review it. We will get back to you soon.</p>
        </div>
      ) : (
        <div>
          <h2>Adopt {dog.name}</h2>
          <div className='adopt-wrapper'>
            <img src={dog.img} alt={dog.name} />
            <form className="adopt-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formValues.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
              
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formValues.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <span className="error">{errors.phone}</span>}

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formValues.address}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formValues.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formValues.state}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="zipcode"
                placeholder="Zipcode"
                value={formValues.zipcode}
                onChange={handleChange}
                required
              />
              {errors.zipcode && <span className="error">{errors.zipcode}</span>}

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptForm;
