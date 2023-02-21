import React from 'react'
import plate from './assets/meal-icon.png'
import {Link} from 'react-router-dom'

function Header() {
  

  return (
    <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
            <Link onClick={window.location.reload} className="btn btn-ghost normal-case text-xl" to='/'><img src={plate} height={20} width={35} className='pr-1'/>MyRecipes</Link>
        </div>
        <div className="flex-1 navbar-end">
        <Link className="btn btn-ghost normal-case text-xl" to='/newRecipe'>Create A New Recipe</Link>
        </div>
    </div>
  )
}

export default Header