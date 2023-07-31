import React, { useState } from 'react';
import axios from 'axios';
import './honeycomb.css';

const OTPValidation = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here
    if (!name || !phone || !email) {
      alert('Please fill in all the fields');
      return;
    }

    try {
      // Your API credentials and URL
      const apiKey = 'tk1XvHlgQR3V6dhUbm8STiNYroD7sjfI';
      const apiToken = 'd87kosvaxj4cuf3y9hlnbe106g5qipz2';
      const apiUrl = 'http://192.168.29.244:3000/api/verify/';

      const requestData = {
        channel: 'email',
        email: email,
        callback_url: 'https://ABharathRajiv.github.io/',
        success_redirect_url:
          'https://ABharathRajiv.github.io/payments/qHgZiJQ8YF/otp-complete/',
        fail_redirect_url:
          'https://ABharathRajiv.github.io/payments/qHgZiJQ8YF/otp-fail/',
        metadata: JSON.stringify({ order_id: 'xfdu48sfdjsdf', agent_id: 2258 }),
        captcha: 'true',
        hide: 'true',
        lang: 'en',
      };

      const authHeader = {
        Authorization: `Basic ${btoa(`${apiKey}:${apiToken}`)}`,
      };

      const response = await axios.post(apiUrl, requestData, {
        headers: authHeader,
      });

      setResponse(response.data);
    } catch (error) {
      console.error('Error requesting OTP:', error);
      setResponse(null);
    }
  };

  return (
    <div className='OTPValidation'>
      <h1>OTP Validation</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Name:</h2>
          <input
            type='text'
            value={name}
            placeholder='Sharath S'
            onChange={(e) => setName(e.target.value)}
          />
          <h2>Phone Number:</h2>
          <input
            type='number'
            value={phone}
            placeholder='+91'
            onChange={(e) => setPhone(e.target.value)}
          />
          <h2>Email:</h2>
          <input
            type='email'
            value={email}
            placeholder='sharath.s@embedur.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type='submit'>Request OTP</button>
      </form>

      {response && (
        <div className='resultbox'>
          <p>Generated OTP Successfully!</p>
          <p>OTP ID: {response.otp_id}</p>
          <p>OTP Secret: {response.otp_secret}</p>

          <a href={response.link} target='_blank' rel='noopener noreferrer'>
            <button>Validate OTP</button>
          </a>
        </div>
      )}
    </div>
  );
};

export default OTPValidation;
