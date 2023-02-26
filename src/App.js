import React, {useContext} from 'react'
import HomePage from './components/pages/HomePage'
import CreateNewRecipe from './components/pages/CreateNewRecipe'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import CreateNewUser from './components/pages/CreateNewUser'
import StrippedHeader from './components/layout/StrippedHeader'
import {AlertProvider} from './context/AlertContext'
import MealContext from './context/MealContext'

function App() {
  const {userId} = useContext(MealContext)
  return (
    <AlertProvider>
      <Router>
          <Routes>
              <Route exact path='/' element={
                <HomePage/>
              }/>
              {userId ? (
                <>
                  <Route path='/newRecipe' element={
                    <>
                      <CreateNewRecipe/>
                    </>
                  }/>
                </>
              ):(
                <>
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
                </>
              )}
              
              
          </Routes>
      </Router>
    </AlertProvider>
  )
}

export default App