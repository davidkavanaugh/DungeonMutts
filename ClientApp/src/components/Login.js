import React, { Component } from "react";
import $ from "jquery";
import cookie from "js-cookie";

export class Login extends Component {
  static displayName = Login.name;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    if (cookie.get("UserId")) {
      this.props.history.push(`/users/${cookie.get("UserId")}/games`);
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    $(".red-text").empty();
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: this.state.username,
        Password: this.state.password,
      }),
    };
    fetch("api/users/login", requestOptions)
      .then((data) => data.json())
      .then((response) => {
        if (response.errors) {
          $("#username").html("Invalid Username/Password");
        } else {
          cookie.set("UserId", response.userId);
          this.props.history.push(`/users/${response.userId}/games`);
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <span id="username" className="red-text"></span>
          <input
            name="username"
            placeholder="Username"
            type="text"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <span id="password" className="red-text"></span>
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary form-btn">
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}
