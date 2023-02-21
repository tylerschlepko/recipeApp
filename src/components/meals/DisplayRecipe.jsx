import React from 'react'



function DisplayRecipe({recipe}) {
  
  
  return (
    <div className="grid grid-cols-2">
      <div className='custom-card-image mb-6 md:mb-0 pl-2 pt-2 pb-2'>
          <div className='rounded-lg shadow-xl card image-full'>
            <figure>
              <img src={`/uploads/${recipe.img_path}`} alt='' />
            </figure>
            <div className='card-body justify-end'>
              <h2 className='card-title mb-0'>{recipe.title}</h2>
            </div>
          </div>
      </div>
      <div className="container pl-3 pt-2 pb-2">
        <p className='font-bold text-xl'>Description:</p>
        <p>{recipe.description}</p>
      </div>
      <div className="container pl-2 pb-3">
        <p className='font-bold text-xl'>Ingredients:</p>
        <p>{recipe.ingredients}</p>
      </div>
      <div className="container pl-3 pb-3">
        <p className='font-bold text-xl'>Instructions:</p>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  )
}

export default DisplayRecipe