import React from 'react'
import Logo from '../components/Logo'
import {Link} from 'react-router-dom'
import {TextInput, Button, Label} from 'flowbite-react'
import { FaGoogle } from "react-icons/fa";

export default function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex max-w-3xl flex-col md:mx-auto p-10 md:p-0 gap-5 md:gap-0 md:flex-row'>
        {/* left */}
        <div className='flex-1 content-center'>
        <span className=' mx-auto font-bold px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-600 rounded-lg text-white text-xl md:text-4xl'>Prism</span>
        <p className='mt-5 font-semibold'>Prism the truth with post</p>
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your username' />
              <TextInput placeholder='Username' type='text' id='username'></TextInput>
            </div>
            <div>
              <Label value='Your E-mail' />
              <TextInput placeholder='email' type='email' id='email'></TextInput>
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput placeholder='Password' type='text' id='password'></TextInput>
            </div>

            <div className='flex flex-col gap-2'>
              <Button className='bg-gradient-to-r from-red-500 to-purple-500 font-bold' type='submit' >Sign Up</Button>
              <Button className='bg-gradient-to-r from-blue-500 via-green-500 via-yellow-400 to-red-500 ' outline><FaGoogle className='mt-0 mx-2 text-xl'/> Continue With Google</Button>
              <span className='flex gap-2 text-center mt-0'>
              <p>Already Have an Account ! <Link to="/sign-in" className='text-blue-700 font-semibold m-0 underline'>signIn</Link></p>
              </span>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
