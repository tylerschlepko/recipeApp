import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Alert from '../layout/Alert'
import AlertContext from '../../context/AlertContext'

function CreateNewUser() {
    const {makeAlert} = useContext(AlertContext)
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const onChangeSet = (e, setState) => {
        setState(e.target.value)
    }

    const formComplete = () => {
        if(name !== '' && username !== '' && email !== '' && password.length >= 6 && passwordConfirm !== ''){
            return true
        } else {
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== passwordConfirm){
            makeAlert('Passwords do not match')
        } else {
            const userObj = {}
            userObj.name = name
            userObj.username = username
            userObj.email = email
            userObj.password = password
            // window.location.href = '/login'
            const response = await fetch('/newUser', {
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObj)
            })
            const data = await response.json()
            console.log(data)
        }
    }

  return (
    
    <div className="hero">
    <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left p-10">
      <h1 className="text-5xl font-bold">Create an account now!</h1>
    </div>
    <form onSubmit={handleSubmit} className='flex justify-center flex-col w-96'>
        <Alert/>
        <div className="flex justify-between ">
            <div className="form-control w-full max-w-xs w-40 place-items-start pr-1">
                <label className="label">
                    <span className="label-text font-bold text-lg">Name</span>
                </label>
                <input type="text" className="input input-bordered w-full max-w-xs" value={name} onChange={(e)=>{onChangeSet(e, setName)}} autoComplete='name'/>
            </div>
            <div className="form-control w-full max-w-xs w-40 pl-1">
                <label className="label">
                    <span className="label-text font-bold text-lg">Username</span>
                </label>
                <input type="text"  className="input input-bordered w-full max-w-xs" value={username} onChange={(e)=>{onChangeSet(e, setUsername)}} />
            </div>
        </div>
        <div className="form-control w-96">
                <label className="label">
                    <span className="label-text font-bold text-lg">Email</span>
                </label>
                <input type="email"  className="input input-bordered w-full " value={email} onChange={(e)=>{onChangeSet(e, setEmail)}} />
        </div>
        <div className="form-control w-full w-96">
                <label className="label">
                    <span className="label-text font-bold text-lg">Password</span>
                </label>
                <input type="password" placeholder='6+ Characters' className="input input-bordered w-full" value={password} onChange={(e)=>{onChangeSet(e, setPassword)}} />
        </div>
        <div className="form-control w-full w-96">
                <label className="label">
                    <span className="label-text font-bold text-lg">Confirm Password</span>
                </label>
                <input type="password" className="input input-bordered w-full" value={passwordConfirm} onChange={(e)=>{onChangeSet(e, setPasswordConfirm)}} />
        </div>
        <input type='submit' value='Create Account' className={`btn ${formComplete() ? 'btn-primary' : 'btn-disabled'} w-96 mt-6`} />
        <div className="flex justify-center pt-3">
            <p className=''>Already a member? <Link to='/login' className='link'>Sign In</Link></p>
        </div>
    </form>
    </div>
    </div>
  )
}

export default CreateNewUser