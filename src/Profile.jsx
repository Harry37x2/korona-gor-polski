import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ButtonGroup, Button } from "@mui/material";
import Header from "./Header";
import Dashboard from "./Dashboard";


const Profile = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/update-profile">
          <Button sx={{ m: 1 }}>Konto: {currentUser.email}</Button>
        </Link>
        <Link to="/KGPpeaks">
          <Button sx={{ m: 1 }}>Szczyty KGP</Button>
        </Link>
        <Link to="/profile">
          <Button sx={{ m: 1 }}>Szczyty Diadem</Button>
        </Link>
        <Button sx={{ m: 1 }} onClick={handleLogout}>
          Wyloguj
        </Button>
      </ButtonGroup>
      <Dashboard />
    </>
  );
};

export default Profile;
