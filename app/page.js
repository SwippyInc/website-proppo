'use client'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import NavBar from '@/components/NavBar'
import { FinalCTABand, FourPillars, ProblemFraming, SocialProof, SolutionsTeaser, TrustBar, WhatDoesProppoDo, WhyChooseProppo } from '@/components/Sections'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function page() {
  let {setTheme} = useTheme()
  useEffect(()=>{
    setTheme('light')
  },[])
  return (
    <>
      <NavBar/>
      <Hero/>
      <TrustBar/>
      <ProblemFraming/>
      <FourPillars/>
      <WhatDoesProppoDo/>
      <SolutionsTeaser/>
      <WhyChooseProppo/>
      <SocialProof/>
      <FinalCTABand/>
      <Footer/>
      <span id='alert_wrap'></span>
    </>
  )
}
