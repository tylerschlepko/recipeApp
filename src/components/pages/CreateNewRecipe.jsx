
import React, {useContext} from 'react'
import MealContext from '../../context/MealContext'
import {Link} from 'react-router-dom'



function CreateNewRecipe() {
    const {handleDescription, handleFileChange, handleIngredients, handleInstructions, handleTitle, handleSubmit, title, description, ingredients, instructions} = useContext(MealContext)

  return (
    <div className="flex justify-evenly">
        <form action="" className='p-5 grid grid-cols-1 gap-8' onSubmit={handleSubmit} >
            <h1 className='font-bold text-xl text-center'>Upload Your Recipe</h1>
            <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={handleFileChange} required/>
            <input type="text" placeholder="Title" className="input input-bordered input-primary w-full max-w-xs" value={title} onChange={handleTitle} required/>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Description" value={description} onChange={handleDescription} required></textarea>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Ingredients" value={ingredients} onChange={handleIngredients} required></textarea>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Instructions" value={instructions} onChange={handleInstructions} required></textarea>
            <input type='submit' className='btn btn-primary'  ></input>
        </form>
    </div>
  )
}

export default CreateNewRecipe
