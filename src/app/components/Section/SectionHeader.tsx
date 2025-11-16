import React from 'react'
import Reveal from '../Reveal'

type Props = {
    plainText: string,
    highlightText: string
}

function SectionHeader({plainText, highlightText}: Props) {
  return (
    <Reveal initialX={-40}>
      <h2 className='text-[22px] md:text-[35px] text-center'>
          {plainText}{" "}<span className='primitive-box px-2 whitespace-nowrap'>{highlightText}</span>
      </h2>
    </Reveal>
  )
}

export default SectionHeader