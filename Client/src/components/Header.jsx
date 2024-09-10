import React from 'react'
import { Navbar, Button, TextInput, NavbarToggle } from 'flowbite-react'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import {Link,useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  var path = useLocation().pathname;

  return (

    <Navbar className='border-b-2 py-3 h-640px'>
        <Link to="/" className='self-center '>
            <Logo/>
        </Link>

        <form>
            <TextInput type="text" rightIcon={AiOutlineSearch} placeholder="Search..." className='searcher hidden lg:inline'/>
        </form>
        <Button className='w-12 h-10 lg:hidden inline' color='gray'  pill outline><AiOutlineSearch/></Button>
      
        <div className='flex gap-2 md:order-2'>
          <Button className='w-12 h-10 hidden lg:inline border-2' color="grey" outline pill>
            <FaMoon/>
          </Button>
          <Link to="/signin" className='h-10'>
            <Button outline gradientDuoTone="purpleToBlue">Sign IN</Button>
          </Link>
          <Link to="/signup">
            <Button gradientDuoTone="purpleToBlue" outline>Sign UP</Button>
          </Link>
        </div>
        <NavbarToggle/>
        <Navbar.Collapse>
          <Navbar.Link active={path=='/'}  as={'div'}>
            <Link to='/'>Home</Link>
          </Navbar.Link>
          
          <Navbar.Link active={path=='/about'}  as={'div'}>
            <Link to='/about'>About</Link>
          </Navbar.Link>

          <Navbar.Link active={path=='/dashboard'}   as={'div'}>
            <Link to='/dashboard'>Dashboard</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>


  )
}
