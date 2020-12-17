import React, { Component } from "react";
import cookie from "js-cookie";

export class Games extends Component {
  static displayName = Games.name;

  componentDidMount() {
    if (!cookie.get("UserId")) {
      this.props.history.push("");
    } else {
      if (cookie.get("UserId") !== this.props.match.params.userId) {
        this.props.history.push(`/users/${cookie.get("UserId")}/games`);
      }
    }
  }

  render() {
    return <React.Fragment>all games</React.Fragment>;
  }
}
