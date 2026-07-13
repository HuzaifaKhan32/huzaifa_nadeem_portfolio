import React from 'react'
import Hero from './Hero/Hero'
import Projects from './Projects/Projects'
import Contact from './Contact'
import BentoAbout from './BentoAbout/BentoAbout'

function Sections() {
  return (
    <main className='flex flex-col md:max-w-screen-lg w-full gap-[142px] md:pt-60 mx-auto pt-[236px]'>
        <Hero/>
        <BentoAbout/>
        <Projects />
        <Contact/>
    </main>
  )
}

export default Sections