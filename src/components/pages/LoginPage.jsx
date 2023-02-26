import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from '../layout/Alert'
import AlertContext from '../../context/AlertContext'
import MealContext from '../../context/MealContext'

function LoginPage() {
    const navigate = useNavigate()
    const {makeAlert} = useContext(AlertContext)
    const {setUser, userId} = useContext(MealContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const onChangeSet = (e, setState) => {
        setState(e.target.value)
    }

    const formComplete = () => {
        if(username !== '' && password !== ''){
            return true
        } else {
            return false
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const login = {}
        login.username = username
        login.password = password
        const response = await fetch('/getUser', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
        const data = await response.json()
        if(data.msg === 'logged in'){
            setUser(data)
            navigate('/')
        } else {
            makeAlert(data.msg)
        }
        
    }


  return (
    <div className="hero">
    <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left p-10">
      <h1 className="text-5xl font-bold">Sign in now!</h1>
    </div>
    <div className="flex justify-center m-10">
    <form onSubmit={handleSubmit} className='flex justify-center flex-col w-96'>
        <Alert/>
        <div className="form-control w-96">
                <label className="label">
                    <span className="label-text font-bold text-xl">Username</span>
                </label>
                <input type="text"  className="input input-bordered w-full " value={username} onChange={(e)=>{onChangeSet(e, setUsername)}} />
        </div>
        <div className="form-control w-full w-96 mt-4">
                <label className="label">
                    <span className="label-text font-bold text-xl">Password</span>
                </label>
                <input type="password" className="input input-bordered w-full" value={password} onChange={(e)=>{onChangeSet(e, setPassword)}} />
        </div>
        <input type='submit' value='Sign In' className={`btn ${formComplete() ? 'btn-primary' : 'btn-disabled'} w-96 mt-7`}/>
        <div className="flex justify-center pt-3">
            <p className=''>Not a member? <Link to='/newUser' className='link'>Sign up now</Link></p>
        </div>
    </form>
    </div>
    </div>
    </div>
  )
}

export default LoginPage