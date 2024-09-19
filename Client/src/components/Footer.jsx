import React from 'react'
import {Footer} from 'flowbite-react'
import Logo from './Logo.jsx'
import { Link } from 'react-router-dom'
import { FaCopyright } from 'react-icons/fa'
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterOfPage() {
  return (
    <Footer container className='p-3 border-t-8 border-t-teal-400'>
      <div className='w-full flex justify-between flex-wrap'>
        <div className='logoFooter m-5'>
            <Logo></Logo>
        </div>
        <div className='flex gap-5 flex-wrap md:justify-around'>
            {/* About */}
            <div>
                <h3 className='text-gray-600 font-semibold'>About</h3>
            <ul className='text-xs text-gray-500 '>
                <li><Link to='/sign-in' className='hover:underline'>Sign In</Link></li>
                <li><Link to='/sign-up' className='hover:underline'>Sign Up</Link></li>
            </ul>
            </div>
            {/* {Projects } */}
            <div>
            <h3 className='text-gray-600 font-semibold'>Projects</h3>
            <ul className='text-xs text-gray-500 '>
                <li><Link to='#'  target='_blank' className='hover:underline'>Nodemailer</Link></li>
                <li><Link to='#' target='_blank' className='hover:underline'>OES</Link></li>
            </ul>
            </div>

            {/* Contact Me */}
            <div>
            <h3 className='text-gray-600 font-semibold'>Contact Me</h3>
            <ul className='text-xs text-gray-500 '>
                <li>sudarshangondalwad@gmail.com</li>
                <li>9423293088</li>
            </ul>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full flex justify-between'>
            <Footer.Copyright by="Prism's" year={new Date().getFullYear()}/>
            <div className='flex gap-3'>
                <Footer.Icon href='#' target='_blank' icon={BsFacebook}/>
                <Footer.Icon href='#' target='_blank' icon={BsDribbble}/>
                <Footer.Icon href='#' target='_blank' icon={BsInstagram}/>
                <Footer.Icon href='#' target='_blank' icon={BsGithub }/>
            </div>
        </div>
        </div>

    </Footer>
  )
}
