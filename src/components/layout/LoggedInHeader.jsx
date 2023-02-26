import React, {useContext} from 'react'
import plate from './assets/meal-icon.png'
import {Link} from 'react-router-dom'
import MealContext from '../../context/MealContext'

function LoggedInHeader() {
    const {setHome, userId} = useContext(MealContext)
    console.log(userId)
  return (
    <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
            <Link to='/' onClick={setHome} className="btn btn-ghost normal-case text-xl"><img src={plate}  height={20} width={35} className='fill-current pr-1'/>MyRecipes</Link>
        </div>
        <div className="flex-1 navbar-end">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn m-1">Click</label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/newRecipe">Upload Your Recipe</Link></li>
                        <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default LoggedInHeader