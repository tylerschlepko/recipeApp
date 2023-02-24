import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './components/pages/HomePage'
import CreateNewRecipe from './components/pages/CreateNewRecipe'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { MealProvider } from './context/MealContext'
import LoginPage from './components/pages/LoginPage'
import CreateNewUser from './components/pages/CreateNewUser'
import StrippedHeader from './components/layout/StrippedHeader'
import {AlertProvider} from './context/AlertContext'

function App() {
  return (
    <AlertProvider>
    <MealProvider>
      <Router>
          <Routes>
              <Route exact path='/' element={
              <>
              <Header/>
              <HomePage/>
              <Footer/>
              </>
              }/>
              <Route path='/newRecipe' element={<CreateNewRecipe/>}/>
              <Route path='/login' element={
              <>
              <StrippedHeader/>
              <LoginPage/>
              </>
              }/>
              <Route path='/newUser' element={
              <>
              <StrippedHeader/>
              <CreateNewUser/>
              </>
              }/>
          </Routes>
      </Router>
    </MealProvider>
    </AlertProvider>
  )
}

export default App