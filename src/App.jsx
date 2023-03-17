import { Routes, Route } from "react-router-dom";
import "./App.css";
import SharedLayout from "./SharedLayout";
import Dashboard from "./Dashboard";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "./ForgotPassword";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";

import Grid from "@mui/material/Unstable_Grid2";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: green[500],
      },
    },
    components: {
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            paddingBlock: 8,
          },
        },
        variants: [
          {
            props: { variant: "done" },
            style: {
              color: green[500],
            },
          },
        ],
      },
    },
    Button: {
      styleOverrides: {
        root: {
          paddingBlock: 20,
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: 20,
        }}
      >
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<SharedLayout />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/update-profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
