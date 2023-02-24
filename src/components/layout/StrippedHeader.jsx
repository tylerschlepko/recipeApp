import React, {useContext} from 'react'
import plate from './assets/meal-icon.png'
import {Link} from 'react-router-dom'
import MealContext from '../../context/MealContext'

function StrippedHeader() {
    const {setHome} = useContext(MealContext)
    
    return (
    <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
            <Link to='/' onClick={setHome} className="btn btn-ghost normal-case text-xl"><img src={plate}  height={20} width={35} className='fill-current pr-1'/>MyRecipes</Link>
        </div>
    </div>
  )
}

export default StrippedHeader