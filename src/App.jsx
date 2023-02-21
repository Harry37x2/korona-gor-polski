import { Routes, Route } from 'react-router-dom'
import './App.css'
import SharedLayout from './SharedLayout'
import Dashboard from './Dashboard'
import { createTheme } from '@mui/material/styles'
import { green } from '@mui/material/colors'
import { ThemeProvider } from '@emotion/react'

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: green[500]
      }
    },
    components: {
      MuiAccordionSummary: {
        variants: [
          {
            props: { variant: 'done'},
            style: {
              color: green[500]
            }
          }
        ]
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
          <Routes>
            <Route path='/' element={<SharedLayout/>}>
              <Route index element={<Dashboard/>}/>  
            </Route>
          </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
