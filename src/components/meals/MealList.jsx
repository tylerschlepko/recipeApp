import React from 'react'
import MealCard from './MealCard'
import {useContext } from 'react'
import MealContext from '../../context/MealContext'
import DisplayRecipe from './DisplayRecipe'

function MealList() {
  const {recipes} = useContext(MealContext)

  return (
    <div className="flex content-evenly flex-wrap justify-evenly">
        {recipes.map((recipe) => (
          
          <MealCard key={recipe.id} recipe={recipe}/>
        ))}
    </div>
  )
}

export default MealList