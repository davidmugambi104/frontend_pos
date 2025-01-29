import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  getAdminMetrics,
  auditUserActivity,
  manageSecuritySettings 
} from '../../services/api';
import AdminSecurityModal from './AdminSecurityModal';
import ActivityLog from './ActivityLog';
import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);
  const [securitySettings, setSecuritySettings] = useState({});
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [metricsData, auditData, settingsData] = await Promise.all([
          getAdminMetrics(),
          auditUserActivity(),
          manageSecuritySettings('get')
        ]);
        setMetrics(metricsData);
        setAuditLogs(auditData);
        setSecuritySettings(settingsData);
      } catch (error) {
        console.error('Admin dashboard error:', error);
      }
    };

    loadData();
  }, []);

  const handleSecurityUpdate = async (newSettings) => {
    try {
      const updated = await manageSecuritySettings('update', newSettings);
      setSecuritySettings(updated);
    } catch (error) {
      console.error('Security update failed:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-grid">
        <div className="metrics-card">
          <h2>System Metrics</h2>
          <div className="metric-item">
            <span>Active Users:</span>
            <span>{metrics.activeUsers || 0}</span>
          </div>
          {/* Add more metrics */}
        </div>

        <ActivityLog logs={auditLogs} />
        
        <div className="security-card">
          <h2>Security Configuration</h2>
          <button onClick={() => setShowSecurityModal(true)}>
            Modify Settings
          </button>
        </div>
      </div>

      {showSecurityModal && (
        <AdminSecurityModal
          currentSettings={securitySettings}
          onClose={() => setShowSecurityModal(false)}
          onSave={handleSecurityUpdate}
        />
      )}
    </div>
  );
};

export default AdminDashboard;