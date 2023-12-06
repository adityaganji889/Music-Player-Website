import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import {
  deleteUser,
  getAllUsers,
  updateUserAdminStatus,
} from "../apicalls/users";
import { message } from "antd";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [showSpinner, setShowSpinner] = useState(true);
  const getUsers = async () => {
    try {
      message.loading("Fetching Users...", 0.5);
      const response = await getAllUsers();
      if (response.success) {
        setTimeout(() => {
          setShowSpinner(false);
          message.success(response.message);
          setUsers(response.data);
        }, 500);
      } else {
        setTimeout(() => {
          setShowSpinner(false);
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setShowSpinner(false);
        message.error(error.message);
      }, 500);
    }
  };
  const deleteSelectedUser = async (payload) => {
    try {
      message.loading("Deleting Selected User..", 0.5);
      const response = await deleteUser(payload);
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
          setSelectedUser({});
          getUsers();
        }, 500);
      } else {
        setTimeout(() => {
          setShowSpinner(false);
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setShowSpinner(false);
        message.error(error.message);
      }, 500);
    }
  };
  const updateSelectedUser = async (payload) => {
    try {
      message.loading("Updating Admin Status of Selected User...", 0.5);
      const response = await updateUserAdminStatus(payload);
      if (response.success) {
        setTimeout(() => {
          message.success(response.message);
          setSelectedUser({});
          getUsers();
        }, 500);
      } else {
        setTimeout(() => {
          setShowSpinner(false);
          message.info(response.message);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        setShowSpinner(false);
        message.error(error.message);
      }, 500);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="text-center">
      <h2>Users List</h2>
      {showSpinner && (
        <center>
          <Spinner
            animation="border"
            style={{ width: "5rem", height: "5rem" }}
          />
        </center>
      )}
      {users.length > 0 && (
        <Table bordered responsive="sm">
          <thead className="thead-dark">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td
                    className="pointer"
                    onClick={() => {
                      setShowSpinner(true);
                      setSelectedUser(user);
                      updateSelectedUser(user._id);
                    }}
                  >
                    {user.isAdmin ? "✅" : "❌"}
                  </td>
                  <td
                    className="pointer"
                    onClick={() => {
                      setShowSpinner(true);
                      setSelectedUser(user);
                      deleteSelectedUser(user._id);
                    }}
                  >
                    🗑️
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      {!showSpinner && users.length === 0 && (
        <h4 className="text-center mt-4">No Users to display</h4>
      )}
    </div>
  );
}

export default UsersList;
