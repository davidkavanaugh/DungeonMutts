import React from "react";
import { Button } from "reactstrap";

export const Spell = () => {
  return (
    <Button
      id="spell"
      className="action"
      color="primary"
      onClick={() => console.log("spell")}
    >
      spell
    </Button>
  );
};
