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
        <Button sx={{ m: 1 }}>Email: {currentUser.email}</Button>
        <Link to="/">
          <Button sx={{ m: 1 }}>Aktualizuj dane</Button>
        </Link>
        <Link to="/dashboard">
          <Button sx={{ m: 1 }}>Szczyty</Button>
        </Link>
        <Button sx={{ m: 1 }} onClick={handleLogout}>
          Wyloguj
        </Button>
      </ButtonGroup>

      {/* <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong>
          {currentUser.email}
          <Link to="/userScratches" className="btn btn-danger w-100 mt-3">
            Go to SCRATCHES
          </Link>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card> */}
      <div className="w-100 text-center mt-2"></div>
    </>
  );
};

export default Profile;
