import React, { Component } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import cookie from "js-cookie";
import $ from "jquery";

export class NewGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: "",
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      gameName: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createGame = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookie.get("UserId"),
        GameName: this.state.gameName,
      }),
    };
    fetch("api/games", requestOptions)
      .then((data) => data.json())
      .then((response) => {
        console.log(response);
        if (response.errors) {
          for (this.msg in response.errors) {
            $(`#${this.msg.toLowerCase()}`).html(response.errors[this.msg][0]);
          }
        } else {
          cookie.set("GameId", response.gameId);
          window.location.replace(
            `/users/${cookie.get("UserId")}/games/${response.gameId}/heroes/new`
          );
        }
      });
  };
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.toggle} color="primary">
          New Game
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="text-dark"
        >
          <ModalHeader toggle={this.toggle}>New Game</ModalHeader>
          <ModalBody>
            <span id="gamename" className="red-text"></span>
            <Input
              name="gameName"
              placeholder="Game Name"
              type="text"
              value={this.state.gameName}
              onChange={this.handleChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={this.toggle}>
              Cancel
            </Button>
            <Button color="secondary" onClick={this.createGame}>
              Play
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
