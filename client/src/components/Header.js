import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users/:user_id');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        email,
        phone,
      });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:5000/userdetails`, {
        name,
        email,
        phone,
      });
      const updatedUsers = users.map((user) =>
        user._id === userId ? response.data : user
      );
      setUsers(updatedUsers);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/:user_id`);
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="button" onClick={createUser}>
          Create User
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <button type="button" onClick={() => updateUser(user._id)}>
              Update User
            </button>
            <button type="button" onClick={() => deleteUser(user._id)}>
              Delete User
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
