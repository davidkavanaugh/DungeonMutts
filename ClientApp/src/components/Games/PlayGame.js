import React, { Component } from "react";
import { Button } from "reactstrap";
import "./PlayGame.css";

export class PlayGame extends Component {
  static displayName = PlayGame.name;
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // check if user belongs here
    // if (!cookie.get("UserId")) {
    //   this.props.history.push("");
    // } else {
    //   if (cookie.get("UserId") !== this.props.match.params.userId) {
    //     this.props.history.push(`/users/${cookie.get("UserId")}/games`);
    //   }
    // }
  }

  render() {
    return (
      <div id="game-canvas">
        <div id="game-header">
          <div id="game-name" className="game-header-cell">
            game name
          </div>
          <div id="pause-btn" className="game-header-cell">
            pause
          </div>
          <div id="game-level" className="game-header-cell">
            lvl 1
          </div>
        </div>
        <div id="enemy">
          <div id="enemy-name">enemy name</div>
          <div id="enemy-health">enemy health</div>
          <div id="enemy-avatar">enemy avatar</div>
        </div>
        <div id="message">message</div>
        <div id="hero">
          <div id="hero-avatar">hero avatar</div>
          <div id="hero-info">
            <div id="player-username">username</div>
            <div id="hero-health">health</div>
            <div id="hero-mana">mana</div>
          </div>
        </div>
        <div id="actions">
          <Button id="attack" className="action" color="primary">
            attack
          </Button>
          <Button id="spell" className="action" color="primary">
            spell
          </Button>
          <Button id="heal" className="action" color="primary">
            heal
          </Button>
        </div>
        <div id="game-footer">
          <div id="next-turn">next: username</div>
          <div id="player-count">players(num)</div>
        </div>
      </div>
    );
  }
}
