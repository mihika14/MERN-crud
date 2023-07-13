import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HomePage.css";
import {FiDelete} from 'react-icons/fi'
import {BsPencilSquare} from 'react-icons/bs'

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/userdetails");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userlist">
      <h1 className="header">User List</h1>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td data-label="Name">{user.name}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone">{user.phone}</td>
              <td data-label="Actions">
              
                <Link to="/edituser">
                <BsPencilSquare className="editicon"></BsPencilSquare>
                </Link>
                <FiDelete className="deleteicon" onClick={() => deleteUser(user._id)}>Delete</FiDelete>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="createuser">
        <button className="addbtn">Add User</button>
      </Link>
    </div>
  );
};

export default HomePage;

//write code to edit form using api

