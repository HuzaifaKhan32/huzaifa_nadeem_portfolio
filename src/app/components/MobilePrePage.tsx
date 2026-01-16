import Image from 'next/image';
import React from 'react';
import TopBackground from './Hero/TopBackground';
import { motion } from 'framer-motion';


interface MobilePrePageProps {
  onEnter: () => void;
}

const MobilePrePage: React.FC<MobilePrePageProps> = ({ onEnter }) => {
  return (
    <div className="relative overflow-hidden h-screen flex flex-col items-center justify-center text-center">
      <TopBackground />

      <motion.div 
        className="z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-uppercase text-4xl font-bold mb-4 px-4 tracking-wider">WELCOME TO MY <span className='bg-primary text-white rounded px-2 py-1'>PORTFOLIO</span></h1>
      </motion.div>

            <motion.div
              className="z-10 relative flex justify-center w-full mt-6" // Added relative flex justify-center
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className='group relative'>
                  <Image src={"/profile_light_purple.png"} alt='Light Purple Card' width={279} height={330}
                  className='-z-10 w-[279px] h-[330px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:-rotate-2 group-hover:scale-[102%] ease-in-out duration-300'/>
                  <Image src={"/profile_dark_purple.png"} alt='Dark Purple Card' width={279} height={330}
                  className='-z-10 w-[279px] h-[330px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:rotate-2 group-hover:scale-[102%] ease-in-out duration-300'/>
                  <Image src={"/profile_picture_2.jpg"} alt='Profile Picture' width={267} height={320} quality={100}
                  className='rounded-[16px] min-w-[267px] h-[320px] group-hover:scale-[102%] ease-in-out duration-300'/>
              </div>
            </motion.div>
      <motion.button
        onClick={onEnter}
        className='z-10 mt-8 flex gap-2.5 p-2.5 text-white bg-primary items-center text-md rounded font-bold hover:scale-105 transition-transform duration-200 hover:bg-primary/80'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        View Portfolio
        <Image src="/arrow_right_icon.svg" alt="arrow right icon" width={24} height={24} />
      </motion.button>

      <Image src={"/bottom_gradient_mobile.svg"} alt='bottom gradient background' width={1024} height={700} className='absolute bottom-0 -z-50 min-w-[1024px] min-h-[700px]' />
    </div>
  );
};

export default MobilePrePage;
