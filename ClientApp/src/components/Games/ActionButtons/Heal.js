import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "reactstrap";
import cookie from "js-cookie";

export class Heal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  handleHeal = (targetId) => {
    this.toggle();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TargetId: targetId,
        TargetType: "hero",
        LevelNumber: this.props.levelNumber,
        GameId: cookie.get("GameId"),
      }),
    };
    fetch(`api/heroes/${this.props.hero.heroId}/heal`, requestOptions).then(
      (response) => {
        console.log(response);
      }
    );
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Button
          id="heal"
          className="action"
          color="primary"
          onClick={this.toggle}
          disabled={this.props.hero.mana <= 0}
        >
          heal
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="text-dark"
        >
          <ModalHeader toggle={this.toggle}>Players</ModalHeader>
          <ModalBody>
            {this.props.heroesList.map((hero, key) => {
              return (
                <div
                  id="small-hero"
                  key={key}
                  onClick={() => this.handleHeal(hero.heroId)}
                >
                  <img
                    id="small-hero-avatar"
                    src={`/images/heroes/${hero.heroClass}.png`}
                    className={hero.heroClass}
                    alt="hero avatar"
                  />
                  <div id="small-hero-info">
                    <div id="small-player-username">{hero.user.username}</div>
                    <div id="small-hero-health">
                      <Progress
                        color="danger"
                        value={hero.health}
                        max={11 + this.props.levelNumber}
                      />
                    </div>
                    <div id="small-hero-mana">
                      <Progress
                        color="primary"
                        value={hero.mana}
                        max={11 + this.props.levelNumber}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}
