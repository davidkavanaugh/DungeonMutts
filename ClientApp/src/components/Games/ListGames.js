import React, { Component } from "react";
import { Button } from "reactstrap";
import cookie from "js-cookie";
import { JoinGame } from "./JoinGame";
import { NewGame } from "./NewGame";
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
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`api/users/${cookie.get("UserId")}/games`, requestOptions)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          games: response,
        });
      });
  }

  handleClick(gameId) {
    cookie.set("GameId", gameId);
    window.location.replace(`/games/${gameId}`);
  }

  render() {
    return (
      <div id="list-games">
        <div id="my-games">
          {this.state.games.map((game, key) => {
            return (
              <Button
                color="secondary"
                key={key}
                onClick={() => this.handleClick(game.gameId)}
              >
                {game.gameName}
              </Button>
            );
          })}
        </div>

        <div id="list-games-buttons">
          <NewGame />
          <JoinGame />
        </div>
      </div>
    );
  }
}
