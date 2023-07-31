import React, { useState } from 'react';
import axios from 'axios';

const OTPValidation = () => {
  const [email, setEmail] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiKey = 'tk1XvHlgQR3V6dhUbm8STiNYroD7sjfI';
      const apiToken = 'd87kosvaxj4cuf3y9hlnbe106g5qipz2';
      const apiUrl = 'https://otp.dev/api/verify/';

      const requestData = {
        channel: 'email',
        email: email,
        callback_url: 'https://ABharathRajiv.github.io/',
        success_redirect_url: 'https://ABharathRajiv.github.io/payments/qHgZiJQ8YF/otp-complete/',
        fail_redirect_url: 'https://ABharathRajiv.github.io/payments/qHgZiJQ8YF/otp-fail/',
        metadata: JSON.stringify({ order_id: 'xfdu48sfdjsdf', agent_id: 2258 }),
        captcha: 'true',
        hide: 'true',
        lang: 'ja',
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
    <div>
      <h2>OTP Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit">Request OTP</button>
      </form>
      {response && (
        <div>
          <p>OTP ID: {response.otp_id}</p>
          <p>OTP Secret: {response.otp_secret}</p>
          <p>
            OTP Verification Link:{' '}
            console.log(response.link);
            <a href={response.link} target="_blank" rel="noopener noreferrer">
              {response.link}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default OTPValidation;
