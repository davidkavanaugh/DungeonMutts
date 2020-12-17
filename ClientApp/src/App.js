import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ListGames } from "./components/Games/ListGames";
import { BrowserRouter as Router } from "react-router-dom";

import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <Layout>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/users/:userId/games" component={ListGames} />
        </Layout>
      </Router>
    );
  }
}
