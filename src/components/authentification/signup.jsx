import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import { motion, AnimatePresence } from 'framer-motion';
import PasswordStrengthBar from 'react-password-strength-bar';
import { FiUser, FiMail, FiLock, FiArrowRight, FiCheckCircle } from 'react-icons/fi';
// In your Signup component


// Add this to your form

const Signup = () => {
  const [step, setStep] = useState(1);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [serverMessages, setServerMessages] = useState({ error: '', success: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const captchaRef = useRef(null);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .matches(/^[a-zA-Z0-9_]+$/, 'No special characters except _')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    password: Yup.string()
      .min(8, 'Minimum 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Requires uppercase, number, and special character'
      )
      .required('Required'),
    role: Yup.string()
      .oneOf(['user', 'admin'], 'Invalid role')
      .required('Required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: 'user',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!recaptchaToken) {
          setServerMessages({ error: 'Please complete the CAPTCHA' });
          return;
        }

        const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/';
        const response = await fetch(`${API_URL}signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            recaptchaToken
          }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Registration failed');

        setShowSuccess(true);
        captchaRef.current.reset();
        setSubmitting(false);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        setServerMessages({ error: error.message });
        setSubmitting(false);
      }
    }
  });

  const steps = [
    { title: 'Account Details', fields: ['username', 'email'] },
    { title: 'Security Setup', fields: ['password', 'role'] }
  ];

  const handleNextStep = async () => {
    const currentStepFields = steps[step - 1].fields;
    const errors = await formik.validateForm();
    const hasErrors = currentStepFields.some(field => errors[field]);

    if (!hasErrors) setStep(prev => Math.min(prev + 1, steps.length));
  };

  return (
    <motion.div 
      className="signup-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="signup-progress">
        {steps.map((_, index) => (
          <div 
            key={index}
            className={`progress-step ${step > index ? 'completed' : ''} ${step === index + 1 ? 'active' : ''}`}
          />
        ))}
      </div>

      <AnimatePresence mode='wait'>
        {!showSuccess ? (
          <motion.form
            key={step}
            onSubmit={formik.handleSubmit}
            initial={{ opacity: 0, x: step === 1 ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="signup-form"
          >
            <h2>{steps[step - 1].title}</h2>

            {step === 1 && (
              <>
                <div className="form-group">
                  <FiUser className="input-icon" />
                  <input
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.username && formik.touched.username ? 'error' : ''}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="error-message">{formik.errors.username}</div>
                  )}
                </div>

                <div className="form-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.email && formik.touched.email ? 'error' : ''}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error-message">{formik.errors.email}</div>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <FiLock className="input-icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={formik.errors.password && formik.touched.password ? 'error' : ''}
                  />
                  <PasswordStrengthBar 
                    password={formik.values.password} 
                    minLength={8}
                    scoreWords={['Weak', 'Weak', 'Fair', 'Good', 'Strong']}
                    shortScoreWord="Too short"
                  />
                </div>

                <div className="form-group">
                  <select
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    className="role-select"
                  >
                    <option value="user">Standard User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  theme="dark"  // optional
                  size="normal" // or "compact"
                  onChange={token => setRecaptchaToken(token)}
                  
                />
                console.log('Site Key:', process.env.REACT_APP_RECAPTCHA_SITE_KEY);
              </>
            )}
            

            <div className="form-actions">
              {step > 1 && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setStep(prev => Math.max(prev - 1, 1))}
                >
                  Back
                </button>
              )}
              
              {step < steps.length ? (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleNextStep}
                  disabled={formik.isSubmitting}
                >
                  Continue <FiArrowRight />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={formik.isSubmitting || !recaptchaToken}
                >
                  {formik.isSubmitting ? 'Creating Account...' : 'Complete Registration'}
                </button>
              )}
            </div>

            {serverMessages.error && (
              <motion.div 
                className="server-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {serverMessages.error}
              </motion.div>
            )}
          </motion.form>
        ) : (
          <motion.div
            className="success-state"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiCheckCircle className="success-icon" />
            <h3>Account Created Successfully!</h3>
            <p>Check your email for verification instructions</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Signup;