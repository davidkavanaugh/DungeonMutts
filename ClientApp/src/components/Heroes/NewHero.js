import React, { Component } from "react";
import cookie from "js-cookie";
import { Button } from "reactstrap";

import "./NewHero.css";

export class NewHero extends Component {
  static displayName = NewHero.name;
  constructor(props) {
    super(props);
    this.state = {
      heroClass: "",
    };
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

  toggleSelection = (event) => {
    this.setState({
      heroClass: event.target.id,
    });
  };

  handleSubmit = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: cookie.get("UserId"),
        GameId: cookie.get("GameId"),
        HeroClass: this.state.heroClass,
      }),
    };
    fetch("api/heroes", requestOptions)
      .then((data) => data.json())
      .then((response) => {
        if (response.errors) {
          console.log(response.errors);
        } else {
          window.location.replace(`/games/${cookie.get("GameId")}`);
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <div id="heroClasses">
          <div>
            <img
              id="dalmation"
              src="/images/heroes/dalmation.png"
              alt="select the dalmation"
              className={
                this.state.heroClass === "dalmation" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
            <img
              id="poodle"
              src="/images/heroes/poodle.png"
              alt="select the poodle"
              className={
                this.state.heroClass === "poodle" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
          </div>
          <div>
            <img
              id="greyhound"
              src="/images/heroes/greyhound.png"
              alt="select the greyhound"
              className={
                this.state.heroClass === "greyhound" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
            <img
              id="dachshund"
              src="/images/heroes/dachshund.png"
              alt="select the dachshund"
              className={
                this.state.heroClass === "dachshund" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
          </div>
        </div>
        <div className="text-center">
          <Button
            id="play-btn"
            onClick={this.handleSubmit}
            color="primary"
            disabled={this.state.heroClass.length < 1 ? true : false}
          >
            Play
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
