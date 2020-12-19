import React, { Component } from "react";
import cookie from "js-cookie";
import { Button, Form, FormGroup, Input } from "reactstrap";
import BarbarianImg from "../../images/barbarian.png";
import WizardImg from "../../images/wizard.png";
import PaladinImg from "../../images/paladin.png";
import RangerImg from "../../images/ranger.png";
import "./NewHero.css";

export class NewHero extends Component {
  static displayName = NewHero.name;
  constructor(props) {
    super(props);
    this.state = {
      heroname: "",
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

  render() {
    return (
      <React.Fragment>
        <div id="heroClasses">
          <div>
            <img
              id="barbarian"
              src={BarbarianImg}
              alt="select the barbarian"
              className={
                this.state.heroClass === "barbarian" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
            <img
              id="wizard"
              src={WizardImg}
              alt="select the wizard"
              className={
                this.state.heroClass === "wizard" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
          </div>
          <div>
            <img
              id="paladin"
              src={PaladinImg}
              alt="select the paladin"
              className={
                this.state.heroClass === "paladin" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
            <img
              id="ranger"
              src={RangerImg}
              alt="select the ranger"
              className={
                this.state.heroClass === "ranger" ? "active" : "inactive"
              }
              onClick={this.toggleSelection}
            />
          </div>
        </div>
        <Form>
          <FormGroup>
            <Input
              type="text"
              name="heroname"
              id="heroname"
              placeholder="Hero Name"
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </React.Fragment>
    );
  }
}
