import React, { Component } from "react";
import $ from "jquery";
import cookie from "js-cookie";

export class Register extends Component {
  static displayName = Register.name;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirm: "",
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
        Confirm: this.state.confirm,
      }),
    };
    fetch("api/users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          for (this.msg in data.errors) {
            $(`#${this.msg.toLowerCase()}`).html(data.errors[this.msg][0]);
          }
        } else {
          cookie.set("UserId", data.userId);
          window.location.replace(`/users/${data.userId}/games`);
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <h2>Register</h2>
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
          <span id="confirm" className="red-text"></span>
          <input
            name="confirm"
            placeholder="Confirm"
            type="password"
            value={this.state.confirm}
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
