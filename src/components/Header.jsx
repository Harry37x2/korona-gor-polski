import React from "react";
import { Box } from "@mui/material";

import logo from "../../src/img/logo.png"
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

const Header = () => {
  let currentPath = useLocation().pathname
  const logoVisible = currentPath === '/profile' || currentPath === '/'
  return (
    <>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
        {logoVisible && <div><Link to='/'><img src={logo} alt="logo" width={'300px'} /></Link></div>}
        <div><h1>Korona Gór Polski</h1></div>
      </Box>      
    </>
  );
};

export default Header;
