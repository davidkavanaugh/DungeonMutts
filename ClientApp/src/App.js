import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ListGames } from "./components/Games/ListGames";
// import { JoinGame } from "./components/Games/JoinGame";
import { PlayGame } from "./components/Games/PlayGame";
import { NewHero } from "./components/Heroes/NewHero";

import { BrowserRouter as Router } from "react-router-dom";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/users/:userId([0-9]{1,})/games"
              component={ListGames}
            />
            <Route
              exact
              path="/users/:userId([0-9]{1,})/games/:gameId([0-9]{1,})"
              component={PlayGame}
            />
            <Route
              exact
              path="/users/:userId([0-9]{1,})/games/:gameId([0-9]{1,})/heroes/new"
              component={NewHero}
            />
            <Route
              exact
              path="/games/:gameId([0-9]{1,})"
              component={PlayGame}
            />
          </Switch>
        </Layout>
      </Router>
    );
  }
}
