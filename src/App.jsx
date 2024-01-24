import {createBrowserRouter, RouterProvider } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";
import Peaks from "./pages/Peaks";
import { createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";

import Grid from "@mui/material/Unstable_Grid2";
import PeakDetails from "./pages/PeakDetails";
import ErrorElement from "./pages/ErrorElement";


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
  const router = createBrowserRouter([
    {path: '', element: <Welcome />, errorElement: <ErrorElement /> },
    {path: '/peaks',
    element: <SharedLayout/>,
      children: [
        {index: true, element: <ProtectedRoute><Peaks /></ProtectedRoute>},
        {path: ':peakId', element: <ProtectedRoute><PeakDetails /></ProtectedRoute> }
      ]
    },
    {path: 'login', element: <Login/> },
    {path: 'signup', element: <Signup/> },
    {path: 'forgot-password', element: <ForgotPassword/> },
    {path: 'update-profile', element: <ProtectedRoute><UpdateProfile/></ProtectedRoute> },
    {path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute>}
  ]);

  return (
    <ThemeProvider theme={theme}>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginX: 20,
            marginY: 5
          }}
        >
          <RouterProvider router={router}/>
        </Grid>
      </ThemeProvider>    
  );
}

export default App;
