import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Reveal from '../Reveal'

function Hero() {
  return (
    <section className='relative flex flex-row items-center z-20 mx-auto md:gap-9 md:mx-10'>
        <div className='flex flex-col gap-3 items-center md:gap-[34px] md:my-[58px] md:items-start ' >
          <Reveal initialX={-25}>
            <h1 className='text-2xl/1 text-center font-semibold block md:text-[38px] md:text-start md:inline'> 
                <span className='-ml-3'>👋</span>
                {"Hello, I'm Huzaifa and"}{" "} 
                {"I'm a "}<span className='primitive-box block mt-2 text-[27px]  md:inline md:text-[45px] md:mt-0'>Web Developer</span>
            </h1>
          </Reveal>
          <Reveal initialX={-30} duration={0.2}>
            <p className='text-center mx-6 text-sm md:text-[22px] md:text-start md:mx-0'>{"I’m obsessed with code and helping digital founders create unique and helpful software products."}</p>
          </Reveal>
          <Reveal initialX={-40} duration={0.4}>
            <Link href={"mailto:huzaifakhan0856551@gmail.com"} className='self-center flex gap-2.5 p-2.5 text-white bg-primary items-center text-sm rounded font-semibold md:self-start md:text-xl/6'>
            Let&apos;s Connect
            <img src="/arrow_right_icon.svg" alt="arrow right icon" />
            </Link>
          </Reveal>
        </div>
        <div className='group'>
          <Reveal>
            <Image src={"/profile_light_purple.png"} alt='Light Purple Card' width={372} height={440}
            className='md:block hidden -z-10 w-[372px] h-[440px] absolute right-0 group-hover:-rotate-2 group-hover:scale-[102%] ease-in-out duration-300'/>
            <Image src={"/profile_dark_purple.png"} alt='Light Purple Card' width={372} height={440}
            className='md:block hidden -z-10 w-[372px] h-[440px] absolute right-0 group-hover:rotate-2 group-hover:scale-[102%] ease-in-out duration-300'/>
            <Image src={"/profile_picture_2.jpg"} alt='Profile Picture' width={357} height={427} quality={100}
            className='rounded-[16px] md:block hidden min-w-[357px] h-[427px] mr-[7.7px] my-[6.5px] group-hover:scale-[102%] ease-in-out duration-300'/>
          </Reveal>
        </div>
    </section>
  )
}

export default Hero