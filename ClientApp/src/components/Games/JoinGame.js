import React, { Component } from "react";
import { Button } from "reactstrap";

export class JoinGame extends Component {
  static displayName = JoinGame.name;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <Button color="secondary">Join Game</Button>;
  }
}
