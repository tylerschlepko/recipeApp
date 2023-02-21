import React, {useState} from 'react'
import DisplayRecipe from './DisplayRecipe';
import {Link} from 'react-router-dom'




function MealCard({recipe}) {
  const [button, setButton] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleDelete = async () => {
    await fetch(`/recipe/${recipe.id}` ,{
      method: 'DELETE'
    })
    setButton(true)
  }

  const handleEdit = () => {
    setEdit(!edit)
  }

  if(button){
    if(edit){
      return (
        <div className='flex items-center justify-center'>
          <button onClick={handleEdit} className="btn btn-secondary m-5 w-28">Edit</button>
        </div>
      )
    } else {
      return (
      <div className='shadow-xl'>
        <DisplayRecipe recipe={recipe}/>
        <div className='flex items-center justify-center'>
          <button  onClick={()=>{setButton(false)}} className="m-5 btn btn-primary w-28">Shrink</button>
          <button onClick={handleEdit} className="btn btn-secondary m-5 w-28">Edit</button>
          <button onClick={handleDelete} className="btn btn-accent m-5 w-28">Delete</button>
        </div>
      </div>
      )
    }
  } else {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl m-5">
        <figure><img src={`/uploads/${recipe.img_path}`} alt="" /></figure>
        <div className="card-body">
            <h2 className="card-title">{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="card-actions justify-end">
                <button onClick={()=>{setButton(true)}}className="btn btn-primary">Expand</button>
            </div>
        </div>
    </div>
  )
  }
}

export default MealCard