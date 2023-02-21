import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './components/pages/HomePage'
import CreateNewRecipe from './components/pages/CreateNewRecipe'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { MealProvider } from './context/MealContext'

function App() {
  return (
    <MealProvider>
      <Router>
          <Header/>
          <Routes>
              <Route exact path='/' element={<HomePage/>}/>
              <Route path='/newRecipe' element={<CreateNewRecipe/>}/>
          </Routes>
          <Footer/>
      </Router>
    </MealProvider>
  )
}

export default App