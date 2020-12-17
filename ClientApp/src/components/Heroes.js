import React, { Component } from "react";
import cookie from "js-cookie";

export class Heroes extends Component {
  static displayName = Heroes.name;

  componentDidMount() {
    if (!cookie.get("UserId")) {
      this.props.history.push("");
    } else {
      if (cookie.get("UserId") !== this.props.match.params.userId) {
        this.props.history.push(`/users/${cookie.get("UserId")}/heroes`);
      }
    }
  }

  render() {
    console.log(cookie.get("UserId"));
    return <React.Fragment>all Heroes</React.Fragment>;
  }
}
