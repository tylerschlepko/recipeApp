import React, {useContext} from 'react'
import MealContext from '../../context/MealContext'


function EditMeal({recipe}) {
    const {handleEdit} = useContext(MealContext)
  return (
    <form>
    <div className="shadow-xl">
        <div className="grid grid-cols-2">
        <div className='custom-card-image mb-6 md:mb-0 pl-2 pt-2 pb-2'>
            <div className='rounded-lg shadow-xl card image-full'>
                <figure>
                <img src={`/uploads/${recipe.img_path}`} alt='' />
                </figure>
                <div className='card-body justify-end'>
                <h2 className='card-title mb-0'>
                <input type="text" placeholder="Title" className="input input-bordered input-primary w-full max-w-xs" value={recipe.title} required/>    
                </h2>
                </div>
            </div>
        </div>
        <div className="container pl-3 pt-2 pb-2">
            <p className='font-bold text-xl'>Description:</p>
            <p>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Description" value={recipe.description} required></textarea>
            </p>
        </div>
        <div className="container pl-2 pb-3">
            <p className='font-bold text-xl'>Ingredients:</p>
            <p>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Ingredients" value={recipe.ingredients} required></textarea>
            </p>
        </div>
        <div className="container pl-3 pb-3">
            <p className='font-bold text-xl'>Instructions:</p>
            <p>
            <textarea className="textarea textarea-bordered textarea-primary" placeholder="Instructions" value={recipe.instructions} required></textarea>
            </p>
        </div>
        </div>
        
        <div className='flex items-center justify-center'>
            <button onClick={handleEdit} className="btn btn-circle btn-accent btn-outline h-16 w-16 m-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill='currentColor' viewBox="1 5 30 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" d="M7.004 23.087l7.08-7.081-7.07-7.071L8.929 7.02l7.067 7.069L23.084 7l1.912 1.913-7.089 7.093 7.075 7.077-1.912 1.913-7.074-7.073L8.917 25z" /></svg>
            </button>
            <button  className="btn btn-circle btn-outline btn-primary h-16 w-16 m-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="1 5 30 20" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" d="M5 16.577l2.194-2.195 5.486 5.484L24.804 7.743 27 9.937l-14.32 14.32z" /></svg>
            </button>
        </div>
    </div>
    </form>    
  )
}

export default EditMeal