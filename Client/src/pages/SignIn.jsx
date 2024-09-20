import React from 'react'
import Logo from '../components/Logo'
import {Link, useNavigate} from 'react-router-dom'
import {TextInput, Button, Label, Alert, Spinner} from 'flowbite-react'
import { FaGoogle,FaEye } from "react-icons/fa";
import { useState } from 'react';

export default function SignIn() {
  // signUP functionality 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);


  // saving inputs in json
  const handleInputs = (e)=>{

    setFormData({...formData, [e.target.id] : e.target.value});
    console.log(formData);
  }

  // sending inputs to backend
  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!formData.username || !formData.password){
      return setErrorMessage('Please Fill From Completely');
    }
    

    try{
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/auth/user/signin',{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if(data.success == false){
        setLoading(false);
        console.log(res);
       return setErrorMessage(data.message);
      }
      setLoading(false);
      
      res.ok && navigate('/');

    }catch(err){
      setErrorMessage(err.Message);
      setLoading(false);
    }

  }

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
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            
            <div>
              <Label value='Your username' />
              <TextInput placeholder='Username' type='text' id='username' onChange={handleInputs}></TextInput>
            </div>

            <div>
              <Label value='Your Password' />
              <TextInput placeholder='Password' type='password' id='password' onChange={handleInputs} rightIcon={FaEye}></TextInput>
            </div>

            <div className='flex flex-col gap-2'>
              <Button className='bg-gradient-to-r from-red-500 to-purple-500 font-bold' type='submit' disabled={loading} >
                {loading ? <><Spinner></Spinner>'Loading...'</> :'Sign Up'}</Button>

              <Button className='bg-gradient-to-r from-blue-500 via-green-500 via-yellow-400 to-red-500 ' outline><FaGoogle className='mt-0 mx-2 text-xl'/> Continue With Google</Button>
              <span className='flex gap-2 text-center mt-0'>
              <p>Already Have an Account ! <Link to="/sign-in" className='text-blue-700 font-semibold m-0 underline'>signIn</Link></p>
              </span>
            </div>
          </form>
          { errorMessage != null && <Alert color='failure'>{errorMessage}</Alert> }
        </div>
      </div>
    </div>
  )
}
