import React from 'react'
import { Link } from 'react-router-dom'
function CreateNewUser() {
  return (
    <>
    <div className="flex justify-center m-10">
    <form className='flex justify-center flex-col w-96'>
        <div className="flex justify-between ">
            <div className="form-control w-full max-w-xs w-40 place-items-start">
                <label className="label">
                    <span className="label-text font-bold text-lg">Name</span>
                </label>
                <input type="text" className="input input-bordered w-full max-w-xs" autoComplete='name'/>
            </div>
            <div className="form-control w-full max-w-xs w-40">
                <label className="label">
                    <span className="label-text font-bold text-lg">Username</span>
                </label>
                <input type="text"  className="input input-bordered w-full max-w-xs" />
            </div>
        </div>
        <div className="form-control w-96">
                <label className="label">
                    <span className="label-text font-bold text-lg">Email</span>
                </label>
                <input type="text"  className="input input-bordered w-full " />
        </div>
        <div className="form-control w-full w-96">
                <label className="label">
                    <span className="label-text font-bold text-lg">Password</span>
                </label>
                <input type="text" placeholder='6+ Characters' className="input input-bordered w-full" />
        </div>
        <input type='submit' value='Create Account' className='btn btn-primary w-96 mt-6'/>
    </form>
    </div>
    <div className="flex justify-center">
    <p className=''>Already a member? <Link to='/login' className='link'>Sign In</Link></p>
    </div>
    </>
  )
}

export default CreateNewUser