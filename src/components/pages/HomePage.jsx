import React, { useContext, useEffect } from 'react'
import MealContext from '../../context/MealContext'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import MealList from '../meals/MealList'
import LoggedInHeader from '../layout/LoggedInHeader'

function HomePage() {
  const {userId} = useContext(MealContext)
  return (
    <>
    {userId ? <LoggedInHeader/> : <Header/>}
    <MealList/>
    <Footer/>
    </>
  )
}

export default HomePage