import React, { useState } from 'react';

function FeedbackModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    address: '',
    country: 'India',
    email: 'example@sample.com',
    phoneCode: '+91',
    phoneNumber: '123456789'
  });

  const [errors, setErrors] = useState({
    email: 'Please enter a valid e-mail',
    phone: 'Please enter a valid number'
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid e-mail' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (name === 'phoneNumber') {
      if (value && !validatePhone(value)) {
        setErrors(prev => ({ ...prev, phone: 'Please enter a valid number' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = {};

    if (!formData.firstName || !formData.lastName || !formData.address || !formData.country) {
      isValid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid e-mail';
      isValid = false;
    }

    if (!validatePhone(formData.phoneNumber)) {
      newErrors.phone = 'Please enter a valid number';
      isValid = false;
    }

    if (isValid) {
      console.log('Form submitted:', formData);
      
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        country: 'India',
        email: '',
        phoneCode: '+91',
        phoneNumber: ''
      });
      setErrors({ email: '', phone: '' });
      
      setTimeout(() => {
        onClose();
      }, 100);
    } else {
      setErrors(newErrors);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '40px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
          Thank you so much for taking the time!
        </h2>
        <p style={{ margin: '0 0 30px 0', fontSize: '18px', color: '#333' }}>
          Please provie the below details!
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              First Name:
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              Last Name:
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              Address:
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full Postal Address"
              required
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'vertical',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              Country:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="India"
                required
                style={{
                  width: '100%',
                  padding: '10px 35px 10px 10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              Email ID:
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@sample.com"
              required
              style={{
                width: '100%',
                padding: '10px',
                border: errors.email ? '1px solid #ff4444' : '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && (
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#ff4444' }}>{errors.email}</p>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#333' }}>
              Phone Number:
            </label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <input
                type="text"
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handleChange}
                placeholder="+91"
                required
                style={{
                  width: '80px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="123456789"
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.phone ? '1px solid #ff4444' : '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
                {errors.phone && (
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#ff4444' }}>{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#50c878',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45b869'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#50c878'}
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;

