import React, { Component } from "react";
import cookie from "js-cookie";

export class ListHeroes extends Component {
  static displayName = ListHeroes.name;

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
    return <React.Fragment>all Heroes</React.Fragment>;
  }
}
