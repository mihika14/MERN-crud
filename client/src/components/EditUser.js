import React, { Component } from "react";
import axios from "axios";
import "./CreateUser.css";
import { Link } from "react-router-dom";

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
  }

  componentDidMount() {
       const userId = this.props.match?.params?.id;// Get the user ID from the URL parameter
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePhone(e) {
    this.setState({ phone: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userId = this.props.match.params.id; // Get the user ID from the URL parameter
    const userObject = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
    };
    axios
      .put(`http://localhost:5000/users/${userId}`, userObject)
      .then((res) => {
        console.log(res.data);
        console.log("User successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="createuserform">
        <div className="form-container">
        <h1 className="header">Edit User</h1>
        <form className="form" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="label">Name</label>
            <input
              type="text"
              className="input"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onChangeName}
            />
             <label className="label">Email-ID</label>
            <input
              type="text"
              className="input"
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
            <label className="label">Phone Number</label>
            <input
              type="text"
              className="input"
              placeholder="Phone"
              value={this.state.phone}
              onChange={this.onChangePhone}
            />
          </div>
          <Link to ="/">
          <button className="form-submit-btn" type="submit">Update User</button>
          </Link>
        </form>
        </div>
      </div>
    );
  }
}
