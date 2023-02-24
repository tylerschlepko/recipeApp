import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import Alert from '../layout/Alert'
import AlertContext from '../../context/AlertContext'

function LoginPage() {
    const {makeAlert} = useContext(AlertContext)
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

  return (
    <>
    <div className="flex justify-center m-10">
    <form onSubmit={handleSubmit} className='flex justify-center flex-col w-96'>
        <Alert/>
        <div className="form-control w-96">
                <label className="label">
                    <span className="label-text font-bold">Username</span>
                </label>
                <input type="text"  className="input input-bordered w-full " value={username} onChange={(e)=>{onChangeSet(e, setUsername)}} />
        </div>
        <div className="form-control w-full w-96 mt-4">
                <label className="label">
                    <span className="label-text font-bold">Password</span>
                    <span className="label-text"><a className='link'>Forgot Password?</a></span>
                </label>
                <input type="text" className="input input-bordered w-full" value={password} onChange={(e)=>{onChangeSet(e, setPassword)}} />
        </div>
        <input type='submit' value='Sign In' className={`btn ${formComplete() ? 'btn-primary' : 'btn-disabled'} w-96 mt-7`}/>
    </form>
    </div>
    <div className="flex justify-center">
        <p className=''>Not a member? <Link to='/newUser' className='link'>Sign up now</Link></p>
    </div>
    </>
  )
}

export default LoginPage