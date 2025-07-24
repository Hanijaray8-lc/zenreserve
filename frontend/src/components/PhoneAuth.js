import React, { useState } from 'react';
import { auth, RecaptchaVerifier } from './firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOTP = async () => {
    try {
      // Initialize reCAPTCHA verifier
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth, 
        'recaptcha-container', 
        {
          'size': 'invisible',
          'callback': () => {
            // reCAPTCHA solved, OTP will be sent
          }
        }
      );

      const formattedPhone = `+91${phone}`; // For Indian numbers
      const result = await signInWithPhoneNumber(
        auth, 
        formattedPhone, 
        window.recaptchaVerifier
      );
      
      setConfirmationResult(result);
      alert('OTP sent successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert('Phone number verified!');
      // User is now authenticated
    } catch (err) {
      console.error(err);
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      {!confirmationResult ? (
        <>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Enter phone number"
          />
          <button onClick={sendOTP}>Send OTP</button>
          <div id="recaptcha-container"></div>
        </>
      ) : (
        <>
          <input 
            type="text" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="Enter OTP"
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default PhoneAuth;