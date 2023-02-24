import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <>
    <div className="flex justify-center m-10">
    <form className='flex justify-center flex-col w-96'>
        <div className="form-control w-96">
                <label className="label">
                    <span className="label-text font-bold">Username</span>
                </label>
                <input type="text"  className="input input-bordered w-full " />
        </div>
        <div className="form-control w-full w-96 mt-4">
                <label className="label">
                    <span className="label-text font-bold">Password</span>
                    <span className="label-text"><a className='link'>Forgot Password?</a></span>
                </label>
                <input type="text" className="input input-bordered w-full" />
        </div>
        <input type='submit' value='Sign In' className='btn btn-primary w-96 mt-7'/>
    </form>
    </div>
    <div className="flex justify-center">
        <p className=''>Not a member? <Link to='/newUser' className='link'>Sign up now</Link></p>
    </div>
    </>
  )
}

export default LoginPage