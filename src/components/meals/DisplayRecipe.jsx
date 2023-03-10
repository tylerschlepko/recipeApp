import React, {useContext, useEffect} from 'react'
import MealContext from '../../context/MealContext'



function DisplayRecipe({recipe}) {
  const {handleDelete, handleEdit, setShowSingle, checkUser, getData, single} = useContext(MealContext)
  
  useEffect(()=>{
    getData()
    
  },[])

  const textareaStyle = {
    whiteSpace: 'pre-wrap'
  };
  
  return (
    <div className="">
      <div className="grid grid-cols-2">
        <div className='custom-card-image mb-6 md:mb-0 pl-2 pt-2 pb-2'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure>
                <img src={`/uploads/${single.img_path}`} alt='' />
              </figure>
              <div className='card-body justify-end'>
                <h2 className='card-title mb-0'>{single.title}</h2>
              </div>
            </div>
        </div>
        <div className="container pl-3 pt-2 pb-2">
          <p className='font-bold text-xl'>Description:</p>
          <p style={textareaStyle}>{single.description}</p>
        </div>
        <div className="container pl-2 pb-3">
          <p className='font-bold text-xl'>Ingredients:</p>
          <p style={textareaStyle}>{single.ingredients}</p>
        </div>
        <div className="container pl-3 pb-3">
          <p className='font-bold text-xl'>Instructions:</p>
          <p style={textareaStyle}>{single.instructions}</p>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        {checkUser(single.user_id) ? (
          <>
        <button  onClick={()=>{setShowSingle(false)}} className="m-5 btn btn-primary w-28">Go Back</button>
        <button onClick={handleEdit} className="btn btn-secondary m-5 w-28">Edit</button>
        <button onClick={()=>{handleDelete(recipe.id, recipe.img_path)}} className="btn btn-accent m-5 w-28">Delete</button>
        </>
      ):(
        <button  onClick={()=>{setShowSingle(false)}} className="m-5 btn btn-primary w-28">Go Back</button> 
      )}
      </div>
    </div>
  )
}

export default DisplayRecipe