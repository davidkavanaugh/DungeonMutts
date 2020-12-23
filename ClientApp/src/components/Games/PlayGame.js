import React, { Component } from "react";
import {
  Button,
  Progress,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import cookie from "js-cookie";
import $ from "jquery";

import "./PlayGame.css";
import { ActionButtons } from "./ActionButtons/Index";

export class PlayGame extends Component {
  static displayName = PlayGame.name;
  constructor(props) {
    super(props);
    this.state = {
      enemy: {},
      enemyTurn: false,
      game: {
        level: {},
        heroes: [],
      },
      modal: false,
      myHero: {
        user: {
          username: "",
        },
      },
      next: {
        name: "",
        user: {
          username: "",
        },
      },
      turnCounter: 0,
      turn: {
        user: {
          username: "",
        },
      },
    };
  }

  componentDidMount() {
    // check if user belongs here
    if (!cookie.get("UserId")) {
      this.props.history.push("");
    }

    this.getGame(this.props.match.params.gameId);
  }

  enemyAttack(targetId, levelNumber, enemy) {
    if (enemy.bossId) {
      enemy.id = enemy.bossId;
      enemy.type = "boss";
    } else {
      enemy.id = enemy.enemyId;
      enemy.type = "enemy";
    }
    setTimeout(function () {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TargetId: targetId,
          LevelNumber: levelNumber,
          GameId: cookie.get("GameId"),
          EnemyType: enemy.type,
        }),
      };
      fetch(`api/enemies/${enemy.id}/attack`, requestOptions).then(
        (response) => {
          console.log(response);
        }
      );
    }, 2000);
  }

  getGame = (gameId) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`api/games/${gameId}`, requestOptions)
      .then((data) => data.json())
      .then((response) => {
        this.setState({
          game: response,
          heroes: response.heroes,
          turnCounter: response.turnCounter,
        });

        const getEnemy = () => {
          if (response.level.enemies[0].health <= 0) {
            // if enemy 1 is dead, check if enemy 2 is dead
            if (response.level.enemies[1].health <= 0) {
              // if enemy 2 is dead, use boss
              if (response.level.boss.health <= 0) {
                // if boss is dead, go to next level
                this.nextLevel(gameId, response.level.number);
                window.location.reload();
              } else {
                return response.level.boss;
              }
            } else {
              return response.level.enemies[1];
            }
          } else {
            return response.level.enemies[0];
          }
        };

        this.setState({
          enemy: getEnemy(),
        });

        for (let i = 0; i < response.heroes.length; i++) {
          if (response.heroes[i].user.userId == cookie.get("UserId")) {
            this.setState({
              myHero: response.heroes[i],
            });
          }
        }
        let livingHeroes = [];
        for (let i = 0; i < response.heroes.length; i++) {
          if (response.heroes[i].health > 0) {
            livingHeroes.push(response.heroes[i]);
          }
        }
        if (livingHeroes.length === 0) {
          this.gameOver();
          return;
        }
        if (response.turnCounter >= response.heroes.length) {
          // enemy's turn
          const randNumGen = (min, max) => {
            return Math.floor(Math.random() * (max - min) + min);
          };
          const randomNumber = randNumGen(0, livingHeroes.length);
          this.setState({
            enemyTurn: true,
            turn: livingHeroes[randomNumber],
            next: response.heroes[0],
          });

          this.enemyAttack(
            livingHeroes[randomNumber].heroId,
            response.level.number,
            getEnemy()
          );
        } else {
          // player's turn
          this.setState({
            turn: livingHeroes[response.turnCounter],
          });
          if (response.turnCounter + 1 > livingHeroes.length - 1) {
            this.setState({
              next: getEnemy(),
            });
          } else {
            this.setState({
              next: livingHeroes[response.turnCounter + 1],
            });
          }
        }

        console.log(this.state);
      });
  };

  nextLevel = (gameId, currentLevel) => {
    let newLevelNumber = currentLevel;
    if (currentLevel === 4) {
      newLevelNumber = 1;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LevelNumber: newLevelNumber,
      }),
    };
    fetch(`api/games/${gameId}/levels`, requestOptions).then((response) => {
      console.log(response);
    });
  };

  gameOver = () => {
    $("#gameNav").html("");
    $("#game-canvas").html("Game Over");
    setTimeout(function () {
      window.alert("You are all dead.");
      window.location.replace("");
    }, 500);
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div id="game-canvas">
        <div id="game-header">
          <div id="game-name" className="game-header-cell">
            {this.state.game.gameName}
          </div>
          <div id="game-level" className="game-header-cell">
            Lvl {this.state.game.level.number}
          </div>
        </div>
        <div id="enemy">
          <div id="enemy-name">{this.state.enemy.name}</div>
          <div id="enemy-health">
            <Progress
              color="danger"
              value={this.state.enemy.health}
              max={this.state.enemy.healthCapacity}
            />
          </div>
          <img
            id="enemy-avatar"
            src={`/images/enemies/${this.state.enemy.imgSrc}`}
            alt="image of the beast"
          />
        </div>
        <div id="message" className="text-center">
          {this.state.game.message}
        </div>
        {/* current turn or target */}
        <div id="hero" className={this.state.enemyTurn ? "targeted" : null}>
          <img
            id="hero-avatar"
            src={`/images/heroes/${this.state.turn.heroClass}.png`}
            className={this.state.turn.heroClass}
            alt="hero avatar"
          />
          <div id="hero-info">
            <div id="player-username">{this.state.turn.user.username}</div>
            <div id="hero-health">
              <Progress
                color="danger"
                value={this.state.turn.health}
                max={11 + this.state.game.level.number}
              />
            </div>
            <div id="hero-mana">
              <Progress
                color="primary"
                value={this.state.turn.mana}
                max={11 + this.state.game.level.number}
              />
            </div>
          </div>
        </div>

        <ActionButtons
          hero={this.state.turn}
          target={this.state.enemy}
          heroesList={this.state.game.heroes}
          levelNumber={this.state.game.level.number}
          enemyTurn={this.state.enemyTurn}
        />
        <div id="game-footer">
          <div id="next-turn">
            next:
            {this.state.turnCounter + 1 > this.state.game.heroes.length - 1 &&
            !this.state.enemyTurn
              ? this.state.next.name
              : this.state.next.user.username}
          </div>
          <div
            id="player-count"
            onClick={this.toggle}
            style={{ cursor: "pointer" }}
          >
            players({this.state.game.heroes.length})
          </div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className="text-dark"
          >
            <ModalHeader toggle={this.toggle}>Players</ModalHeader>
            <ModalBody>
              {this.state.game.heroes.map((hero, key) => {
                return (
                  <div
                    id="small-hero"
                    key={key}
                    className={
                      hero.user.userId == this.state.turn.user.userId &&
                      !this.state.enemyTurn
                        ? "current"
                        : null
                    }
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
                          max={11 + this.state.game.level.number}
                        />
                      </div>
                      <div id="small-hero-mana">
                        <Progress
                          color="primary"
                          value={hero.mana}
                          max={11 + this.state.game.level.number}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                OK
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
