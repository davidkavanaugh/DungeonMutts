import React, { Component } from "react";
import { Button } from "reactstrap";
import cookie from "js-cookie";

export class JoinGame extends Component {
  static displayName = JoinGame.name;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  // to={`/users/${cookie.get("UserId")}/games/join`}

  render() {
    return <Button color="secondary">Join Game</Button>;
  }
}
