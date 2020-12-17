import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "js-cookie";
import { Button } from "reactstrap";
import "./ListGames.css";

export class ListGames extends Component {
  static displayName = ListGames.name;
  constructor(props) {
    super(props);
    this.state = {
      games: [],
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

    // fetch games
  }

  render() {
    return (
      <div id="list-games">
        {this.state.games.map((game, key) => {
          return <div key={key}>{game}</div>;
        })}
        <div id="list-games-buttons">
          <Link to={`/users/${cookie.get("UserId")}/games/new`}>
            <Button color="primary">New Game</Button>
          </Link>
          <Link to={`/users/${cookie.get("UserId")}/games/join`}>
            <Button color="secondary">Join Game</Button>
          </Link>
        </div>
      </div>
    );
  }
}
