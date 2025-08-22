'use client'
import Link from 'next/link'
import proppo_logo from '../public/images/proppo_logo.png'
import Image from 'next/image'
import Button from './Button'
import { useEffect, useState } from 'react'
import ResponsiveDialog, { GetStartedForm } from './Forms'
import { useSignUpForm } from '@/hooks/useForm'
import ModeToggle from './ThemeToggle'

export default function NavBar() {

  const handleMenuClick = (e) => {
    const sectionId = e.target.getAttribute('data');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('nav')?.classList.remove('show');
    }
  };
  useEffect(()=>{
    let links = document.querySelectorAll('.menu_lia.spl')
    links?.forEach(link=>link.addEventListener('click',handleMenuClick))
  },[])

  const {renderSUForm, formComponent} = useSignUpForm()

  return (
    <>
    {formComponent}
    <nav className="flex items-center justify-center fixed top-0 left-0 h-auto w-screen bg-white/70 dark:bg-black/90">
        <div className="flex items-center justify-between w-[90%] md:w-[80%] py-4 madiv">
            <Link href={"/"} className='flex items-center justify-start logo_a dark:bg-white p-2 rounded-xl'><Image src={proppo_logo} alt='Proppo' height={500} width={500} className="h-6 md:h-8 w-auto p-0 m-0"/></Link>
            
            <div className="menu">
              <ul className="menu_ul">
                <li><p className="menu_lia spl" data="features">Features</p></li>
                <li><p className="menu_lia spl" data="services">Services</p></li>
                <li><p className="menu_lia spl" data="whyus">Why Us</p></li>
                <li><p className="menu_lia spl" data="pricing">Pricing</p></li>
                <li><p className="menu_lia spl" data="team">Team</p></li>
              </ul>
              <div className="flex flex-col md:flex-row items-center justify-start w-[90%] md:w-auto md:justify-center gap-2 mt-2 mb-8 md:mb-0">
                <Button styles="btn_pri px-5 block w-full md:w-auto text-lg md:text-base" onClick={renderSUForm}>Sign Up</Button>
                <Link className='block w-full md:w-auto' href={"https://pms.proppo.in"} target='_blank'><Button styles="btn_sec px-5 block w-full md:w-auto text-lg md:text-base">Login</Button></Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button className="menu_toggle" role='button' onClick={()=>{
                document.querySelector('nav')?.classList.toggle('show')
              }}><div className='menu_line'></div></button>
              <div className="md:-mb-1 md:ml-1 lg:ml-[-4px]">
                <ModeToggle/>
              </div>
            </div>
        </div>
    </nav>
    </>
  )
}

export function NavBar1() {
  const {renderSUForm, formComponent} = useSignUpForm()
  return (
    <>
    {formComponent}
    <nav className="flex items-center justify-center fixed top-0 left-0 h-auto w-screen bg-white/70 dark:bg-black/90">
        <div className="flex items-center justify-between w-[90%] md:w-[80%] py-4 madiv">
            <Link href={"/"} className='flex items-center justify-start logo_a'><Image src={proppo_logo} alt='Proppo' height={500} width={500} className="h-6 md:h-8 w-auto p-0 m-0"/></Link>
            <button className="menu_toggle -mt-2" role='button' onClick={()=>{
              document.querySelector('nav')?.classList.toggle('show')
            }}><div className='menu_line'></div></button>
            <div className="menu">
              <ul className="menu_ul">
                <li><Link className="menu_lia" href={"/"}>Home</Link></li>
                <li><Link className="menu_lia" href={"/pricing"}>Pricing</Link></li>
              </ul>
              <div className="flex flex-col md:flex-row items-center justify-start w-[90%] md:w-auto md:justify-center gap-2 mt-2 mb-8 md:mb-0">
                <Button styles="btn_pri px-5 block w-full md:w-auto text-lg md:text-base" onClick={renderSUForm}>Sign Up</Button>
                <Link className='block w-full md:w-auto' href={"https://pms.proppo.in"} target='_blank'><Button styles="btn_sec px-5 block w-full md:w-auto text-lg md:text-base">Login</Button></Link>
              </div>
            </div>
        </div>
    </nav>
    </>
  )
}
