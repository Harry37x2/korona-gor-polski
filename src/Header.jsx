import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <h1>Korona Gór Polski</h1>
      </div>
      <ButtonGroup
        sx={{ mb: 4 }}
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/profile">
          <Button>Konto</Button>
        </Link>
      </ButtonGroup>
    </>
  );
};

export default Header;
