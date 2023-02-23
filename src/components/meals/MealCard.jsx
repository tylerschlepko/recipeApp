import React, {useEffect, useContext} from 'react'
import MealContext from '../../context/MealContext';




function MealCard({single, recipe}) {
  const {getOne} = useContext(MealContext)

    useEffect(()=>{
      single = single
    },[single])

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl m-5">
        <figure><img src={`/uploads/${recipe.img_path}`} alt="" /></figure>
        <div className="card-body">
            <h2 className="card-title">{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="card-actions justify-end">
                <button onClick={async()=>{ await getOne(recipe.id)}}className="btn btn-primary">Show More</button>
            </div>
        </div>
    </div>
  )
  
}

export default MealCard