'use client'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'
import WhoIsProppoFor, { FinalCTASection, PricingSection, Testimonials, WhatDoesProppoDo, WhoGetsWhat, WhyChooseProppo } from '@/components/Sections'
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

export default function page() {
  let {setTheme} = useTheme()
  useEffect(()=>{
    setTheme('light')
  },[])
  return (
    <>
      <NavBar/>
      <Hero/>
      <WhoIsProppoFor/>
      <WhyChooseProppo/>
      <WhatDoesProppoDo/>
      <WhoGetsWhat/>
      <PricingSection/>
      <Testimonials/>
      <FinalCTASection/>
      <Footer/>
      <span id='alert_wrap'></span>
    </>
  )
}
