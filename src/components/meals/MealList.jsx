import React from 'react'
import MealCard from './MealCard'
import {useContext, useEffect } from 'react'
import MealContext from '../../context/MealContext'
import DisplayRecipe from './DisplayRecipe'
import EditMeal from './EditMeal'


function MealList() {
  const { recipes, showSingle, single, edit} = useContext(MealContext)

  

  if(showSingle) {
    if(edit){
      return(<EditMeal recipe={single}/>)
    } else {
      return(
          <DisplayRecipe recipe={single}/>
      )
    }
  } else {
    return (
    <div className="flex content-evenly flex-wrap justify-evenly">
        {recipes.map((recipe) => (
          <MealCard key={recipe.id} recipe={recipe} single={single}/>
        ))}
    </div>
    )
  }
}

export default MealList