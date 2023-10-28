import React from "react";
import { Box } from "@mui/material";

import logo from "../src/img/logo.png"

const Header = () => {
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
        <div><img src={logo} alt="logo" width={'300px'} /></div>
        <div><h1>Korona Gór Polski</h1></div>
      </Box>      
    </>
  );
};

export default Header;
