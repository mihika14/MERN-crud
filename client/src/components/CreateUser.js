import React, { Component } from "react";
import "./CreateUser.css";
import { Link } from "react-router-dom";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this); // ensure that the this context within the handleSubmit function refers to the component instance.
  }

  // function is responsible for handling new user registration and making a POST request to the server.
  handleSubmit(e) {
    e.preventDefault();
    const { name, email, phone } = this.state;
    console.log(name, email, phone);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true, //to ensure that the server allows cross-origin requests.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "https://localhost:3000",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  }
  
  render() {
    return (
      <>
        <div className="createuserform">
          <div class="form-container">
          <h1 className="header">Create User</h1>
            <form class="form" onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label className="label">Name</label>
                <input
                  type="text"
                  class="input"
                  placeholder="Name"
                  onChange={(e) => this.setState({ name: e.target.value })} // updates the fname with the new value entered by the user.
                />

                <label className="label">Email-ID</label>
                <input
                  type="email"
                  class="input"
                  placeholder="Email"
                  onChange={(e) => this.setState({ email: e.target.value })} // updates the email with the new value entered by the user.
                />

                <label className="label">Phone Number</label>
                <input
                  type="number"
                  class="input"
                  placeholder="Phone number"
                  autoComplete="on"
                  onChange={(e) => this.setState({ password: e.target.value })} // updates the password with the new value entered by the user.
                />
              </div>

              <Link to="/">
                <button className="form-submit-btn">Add user</button>
              </Link>
            </form>
          </div>
        </div>
      </>
    );
  }
}
