import React from 'react'
import skills from "@/app/data/skill.json"
import SectionContainer from '../Section/SectionContainer'
import SectionHeader from '../Section/SectionHeader'
import Skill from './Skill'
import Image from 'next/image'


function Skills() {
  return (
    <SectionContainer id='Skills'>
        <div className='section-contents mx-[22px] md:flex md:justify-center md:items-center'>
            <SectionHeader plainText='💻This is my' highlightText='Tech Stack'/>
        </div>
        <div className='card w-full max-w-[calc(100%-44px)] md:max-w-none flex flex-wrap flex-col md:flex-row justify-center items-center gap-[19px] md:gap-[33px] px-[33px] py-[27px] mb-10'>
            {skills.map((skill, index) => (
                    <Skill key={index} name={skill.name} icon={skill.icon}/>
            ))}
        </div>
        <Image 
        src="/tech_stack_grid_dark.svg"
        alt='Dark Grid Background'
        width={569}
        height={373}
        className='hidden dark:md:block absolute -z-10 -left-[220px] -top-[100px]'
        />
        <Image 
        src="/tech_stack_grid.svg"
        alt='Light Grid Background'
        width={569}
        height={373}
        className='dark:hidden md:block absolute -z-10 -left-[210px] -top-[100px]'
        />
    </SectionContainer>
  )
}

export default Skills