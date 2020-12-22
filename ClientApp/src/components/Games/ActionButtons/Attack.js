import React, { Component } from "react";
import { Button } from "reactstrap";
import cookie from "js-cookie";

export class Attack extends Component {
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

  handleAttack = () => {
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
    console.log(requestOptions);
    fetch(`api/heroes/${this.props.hero.heroId}/attack`, requestOptions).then(
      (response) => {
        console.log(response);
      }
    );
  };
  render() {
    return (
      <Button
        id="attack"
        className="action"
        color="primary"
        onClick={this.handleAttack}
      >
        attack
      </Button>
    );
  }
}
