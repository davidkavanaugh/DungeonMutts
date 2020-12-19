import React from "react";
import { Button } from "reactstrap";
import cookie from "js-cookie";

const createGame = () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: cookie.get("UserId"),
    }),
  };
  fetch("api/games", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cookie.set("GameId", data.gameId);
      window.location.replace(
        `/users/${cookie.get("UserId")}/games/${data.gameId}/heroes/new`
      );
    })
    .catch((err) => console.log(err));
};
export const NewGame = () => {
  return (
    <Button onClick={createGame} color="secondary">
      New Game
    </Button>
  );
};
