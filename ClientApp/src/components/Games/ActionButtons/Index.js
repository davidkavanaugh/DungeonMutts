import React, { Component } from "react";
import { Attack } from "./Attack";
import { Spell } from "./Spell";
import { Heal } from "./Heal";
import cookie from "js-cookie";

import "./ActionButtons.css";

export class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (
      this.props.hero.user.userId == cookie.get("UserId") &&
      !this.props.enemyTurn
    ) {
      return (
        <div id="actions">
          <Attack
            hero={this.props.hero}
            target={this.props.target}
            levelNumber={this.props.levelNumber}
          />
          <Spell />
          <Heal />
        </div>
      );
    } else {
      return null;
    }
  }
}
