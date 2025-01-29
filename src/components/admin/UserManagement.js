import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { 
  fetchAdminUsers,
  updateUserRole,
  auditUserActions
} from '../../services/api';
import UserActionDialog from './UserActionDialog';
import './css/UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'lastLogin', headerName: 'Last Login', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <button 
          onClick={() => setSelectedUser(params.row)}
          className="action-btn"
        >
          Manage
        </button>
      ),
    },
  ];

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchAdminUsers();
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error('User load error:', error);
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      await auditUserActions({
        action: `Role updated to ${newRole}`,
        targetUserId: userId
      });
    } catch (error) {
      console.error('Role update failed:', error);
    }
  };

  return (
    <div className="user-management">
      <div className="grid-container">
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          loading={loading}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      {selectedUser && (
        <UserActionDialog
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onRoleUpdate={handleRoleUpdate}
        />
      )}
    </div>
  );
};

export default UserManagement;