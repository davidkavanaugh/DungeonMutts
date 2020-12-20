import React, { Component } from "react";
import cookie from "js-cookie";
import { Button } from "reactstrap";
import DalmationImg from "../../images/dalmation.png";
import DachshundImg from "../../images/dachshund.png";
import GreyhoundImg from "../../images/greyhound.png";
import PoodleImg from "../../images/poodle.png";
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
    window.location.replace(`/games/${cookie.get("GameId")}`);
  };

  render() {
    return (
      <React.Fragment>
        <div id="heroClasses">
          <div>
            <img
              id="dalmation"
              src={DalmationImg}
              alt="select the dalmation"
              className={
                this.state.heroClass === "dalmation" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
            <img
              id="poodle"
              src={PoodleImg}
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
              src={GreyhoundImg}
              alt="select the greyhound"
              className={
                this.state.heroClass === "greyhound" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
            <img
              id="dachshund"
              src={DachshundImg}
              alt="select the dachshund"
              className={
                this.state.heroClass === "dachshund" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
          </div>
        </div>
        <div className="text-center">
          <Button id="play-btn" onClick={this.handleSubmit} color="primary">
            Play
          </Button>
        </div>
      </React.Fragment>
    );
  }
}
