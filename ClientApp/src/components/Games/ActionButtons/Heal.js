import React from "react";
import { Button } from "reactstrap";

export const Heal = () => {
  return (
    <Button
      id="heal"
      className="action"
      color="primary"
      onClick={() => console.log("heal")}
    >
      heal
    </Button>
  );
};
