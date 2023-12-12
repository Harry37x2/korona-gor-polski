import React, {useState} from 'react'
import Header from '../components/Header'
import { Button } from '@mui/material'

import Box from "@mui/material/Box";


import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const Welcome = () => {
    const { currentUser, logout, error, setError } = useAuth();
    console.log(currentUser)

    async function handleLogout() {
        setError("");
        try {
          await logout();
          navigate("/");
        } catch {
          setError("Failed to log out");
        }
      }
    
  return (
    <>
        <Header />
        {currentUser !== null ? 
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: '2rem'
          }}>
            <Link to="profile">
                <Button
                variant="contained"
                sx={{width: '150px'}}
                >Konto
                </Button>  
            </Link>
            
            <Link to="">
            <Button
                variant="contained"
                sx={{width: '150px'}}
                onClick={handleLogout}
                >Wyloguj</Button>
            </Link>
        </Box>
        :
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: '2rem'
          }}>
            <Link to="login">
                <Button
                variant="contained"
                sx={{width: '150px'}}
                >Zaloguj
                </Button>  
            </Link>
            
            <Link to="signup">
            <Button
                variant="contained"
                sx={{width: '150px'}}
                >Zarejestruj</Button>
            </Link>
        </Box>
        }
    </>
  )
}

export default Welcome