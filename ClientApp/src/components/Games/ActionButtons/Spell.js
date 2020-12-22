import React, { Component } from "react";
import { Button } from "reactstrap";
import cookie from "js-cookie";

export class Spell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetType: "enemy",
    };
  }

  componentDidMount() {
    if (this.props.target.bossId) {
      this.setState({
        targetType: "boss",
      });
    }
  }

  handleSpell = () => {
    let targetId = this.props.target.enemyId;
    if (this.state.targetType === "boss") {
      targetId = this.props.target.bossId;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TargetId: targetId,
        TargetType: this.state.targetType,
        LevelNumber: this.props.levelNumber,
        GameId: cookie.get("GameId"),
      }),
    };
    fetch(`api/heroes/${this.props.hero.heroId}/spell`, requestOptions).then(
      (response) => {
        console.log(response);
      }
    );
  };
  render() {
    return (
      <Button
        id="spell"
        className="action"
        color="primary"
        onClick={this.handleSpell}
        disabled={this.props.hero.mana <= 0}
      >
        spell
      </Button>
    );
  }
}
