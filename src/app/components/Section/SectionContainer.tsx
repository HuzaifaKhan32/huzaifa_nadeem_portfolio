import React from 'react'

type Props = React.PropsWithChildren<{
    id: string
}>

function SectionContainer({children, id}: Props) {
  return (
    <section id={id} className='container mx-auto relative flex flex-col gap-10 items-center justify-center z-30'>
        {children}
    </section>
  )
}

export default SectionContainer