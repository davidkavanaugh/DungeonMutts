import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import cookie from "js-cookie";

export class JoinGame extends Component {
  static displayName = JoinGame.name;
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      gameCode: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      gameCode: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleJoinGame = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`api/games/${this.state.gameCode}`, requestOptions)
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        cookie.set("GameId", response.gameId);
        window.location.replace(
          `/users/${cookie.get("UserId")}/games/${response.gameId}/heroes/new`
        );
      });
  };

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle} color="primary">
          Join Game
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="text-dark"
        >
          <ModalHeader toggle={this.toggle}>Join Game</ModalHeader>
          <ModalBody>
            <Input
              name="gameCode"
              placeholder="Enter Game Code"
              onChange={this.handleChange}
              value={this.state.gameCode}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color="secondary" onClick={this.handleJoinGame}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
