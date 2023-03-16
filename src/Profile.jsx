import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ButtonGroup, Button } from "@mui/material";

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
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/update-profile">
          <Button sx={{ m: 1 }}>Konto: {currentUser.email}</Button>
        </Link>
        <Link to="/dashboard">
          <Button sx={{ m: 1 }}>Szczyty KGP</Button>
        </Link>
        <Button sx={{ m: 1 }} onClick={handleLogout}>
          Wyloguj
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Profile;
