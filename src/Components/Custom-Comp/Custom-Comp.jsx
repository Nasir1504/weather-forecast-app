import React, { useState } from 'react';
import './CustomForm.css'; // Import the custom CSS file

const CustomForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    // Add other input states as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="zf-templateWrapper zf-templateWidth">
      <div className="zf-tempHeadContBdr">
        <h1 className="zf-frmTitle">Form Title</h1>
        <p className="zf-frmDesc">This is the description for the form.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="zf-tempFrmWrapper">
        <div className="zf-tempContDiv">
          {/* Name Field */}
          <div className="zf-name">
            <label className="zf-labelName">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="zf-form-sBox"
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div className="zf-email">
            <label className="zf-labelName">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="zf-form-sBox"
              placeholder="Enter your email"
            />
          </div>

          {/* Address Field */}
          <div className="zf-address">
            <label className="zf-labelName">Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="zf-form-sBox"
              placeholder="Enter your address"
            />
          </div>

          {/* Submit Button */}
          <div className="zf-fmFooter">
            <button type="submit" className="zf-submitColor">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;