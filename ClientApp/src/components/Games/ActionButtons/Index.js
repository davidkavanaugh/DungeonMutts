import React, { Component } from "react";
import { Button } from "reactstrap";
import cookie from "js-cookie";

import "./ActionButtons.css";

export class ActionButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.turn.user.userId == cookie.get("UserId")) {
      return (
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
      );
    } else {
      return null;
    }
  }
}
