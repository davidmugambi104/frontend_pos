import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { adminLogout, verifyAdminSession } from '../../services/api';
import './css/AdminHeader.css';

const AdminHeader = () => {
  const [sessionStatus, setSessionStatus] = useState('verifying');
  const [lastActivity, setLastActivity] = useState(Date.now());
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const activityWatcher = setInterval(() => {
      if (Date.now() - lastActivity > 900000) { // 15m inactivity
        handleAutoLogout();
      }
    }, 60000);

    const verifySession = async () => {
      try {
        await verifyAdminSession();
        setSessionStatus('active');
      } catch (error) {
        handleAutoLogout();
      }
    };

    verifySession();
    return () => clearInterval(activityWatcher);
  }, [lastActivity]);

  const handleActivity = () => setLastActivity(Date.now());

  const handleAutoLogout = async () => {
    await adminLogout();
    logout();
    navigate('/admin/login', { state: { sessionExpired: true } });
  };

  const handleManualLogout = async () => {
    await adminLogout();
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-header" onMouseMove={handleActivity}>
      <div className="header-content">
        <h1>Admin Console</h1>
        <div className="admin-controls">
          <span className="admin-info">
            {currentUser?.email} | Session: {sessionStatus}
          </span>
          <button className="logout-btn" onClick={handleManualLogout}>
            Secure Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;