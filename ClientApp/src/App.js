import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ListGames } from "./components/Games/ListGames";
import { NewGame } from "./components/Games/NewGame";
import { JoinGame } from "./components/Games/JoinGame";
import { PlayGame } from "./components/Games/PlayGame";

import { BrowserRouter as Router } from "react-router-dom";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/users/:userId/games" component={ListGames} />
          <Route
            exact
            path="/users/:userId/games/:gameId"
            component={PlayGame}
          />
          <Route exact path="/users/:userId/games/new" component={NewGame} />
          <Route exact path="/users/:userId/games/join" component={JoinGame} />
        </Layout>
      </Router>
    );
  }
}
