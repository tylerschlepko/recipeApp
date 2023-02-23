import React from 'react'
import MealCard from './MealCard'
import {useContext, useState } from 'react'
import MealContext from '../../context/MealContext'
import DisplayRecipe from './DisplayRecipe'


function MealList() {
  const { recipes, handleDelete, setButton, handleEdit, button, single} = useContext(MealContext)



  if(button) {
   
    return(
    <div className='shadow-xl'>
        <DisplayRecipe recipe={single}/>
        <div className='flex items-center justify-center'>
          <button  onClick={()=>{setButton(false)}} className="m-5 btn btn-primary w-28">Shrink</button>
          <button onClick={handleEdit} className="btn btn-secondary m-5 w-28">Edit</button>
          <button onClick={()=>{handleDelete(single.id)}} className="btn btn-accent m-5 w-28">Delete</button>
        </div>
    </div>
    )
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