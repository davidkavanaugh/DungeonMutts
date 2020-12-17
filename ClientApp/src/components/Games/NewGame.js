import React, { Component } from "react";
import cookie from "js-cookie";

export class NewGame extends Component {
  static displayName = NewGame.name;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // check if user belongs here
    if (!cookie.get("UserId")) {
      this.props.history.push("");
    } else {
      if (cookie.get("UserId") !== this.props.match.params.userId) {
        this.props.history.push(`/users/${cookie.get("UserId")}/games`);
      }
    }
  }

  render() {
    return <div id="new-game">new game</div>;
  }
}
