import React from 'react'
import MealCard from './MealCard'
import { useEffect, useState } from 'react'


function MealList() {
  const [recipes, setRecipes] = useState([])
  const getData = async () => {
    try {
      const response = await fetch ('/recipes', {
        method: "GET"
      }) 
      const data = await response.json()
      setRecipes(data)
      console.log(recipes);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div className="flex content-evenly flex-wrap justify-evenly">
        {recipes.map((recipe) => (
          <MealCard key={recipe.id} recipe={recipe}/>
        ))}
    </div>
  )
}

export default MealList