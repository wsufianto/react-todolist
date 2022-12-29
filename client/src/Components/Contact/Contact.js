import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    status: 'Submit',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, status: 'Sending' });

    axios
      .post('https://news-app-production-a8a0.up.railway.app/contact', formData)
      .then((response) => {
        if (response.data.code === 200) {
          alert('Message Sent');
          setFormData({ name: '', email: '', message: '', status: 'Submit' });
        } else if (response.data.code === 400) {
          alert('Message Failed');
          setFormData({ ...formData, status: 'Submit' });
        }
      });
  };

  return (
    <div className="container items-center border-2 text-blue-600 font-bold mx-auto max-w-3xl px-3 sm:text-xl sm:px-20 py-10 mt-10 bg-gray-100 rounded-xl shadow-xl">
      <h1 className="text-2xl sm:text-3xl text-center pb-5"> Contact </h1>
      <form id="contactForm" onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name" className="text-xl py-5">
          Name:{' '}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          className="text-md border-2 rounded-md p-2 max-w-sm"
          onChange={handleChange}
          value={formData.name}
          required
        />

        <label htmlFor="email" className="text-xl py-5">
          Email:{' '}
        </label>
        <input
          type="email"
          name="email"
          id="emailAdd"
          placeholder="Enter your email address"
          className="text-md border-2 rounded-md p-2 max-w-sm"
          onChange={handleChange}
          value={formData.email}
          required
        />

        <label htmlFor="message" className="text-xl py-5">
          Message:{' '}
        </label>
        <textarea
          rows="5"
          name="message"
          className="text-lg border-2 rounded-xl p-2"
          placeholder="Message..."
          onChange={handleChange}
          value={formData.message}
        ></textarea>

        <button
          type="submit"
          className="p-2.5 border-2 bg-blue-600 text-white mt-10 w-28 rounded-lg hover:bg-blue-500"
        >
          {formData.status}
        </button>
      </form>
    </div>
  );
};

export default Contact;
