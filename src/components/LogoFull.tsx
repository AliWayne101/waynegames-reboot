import React from 'react'
import Image from 'next/image'

const LogoFull = () => {
  return (
    <div className='flex justify-center'>
      <Image src={'/assets/logofull.png'} alt='logo' className='logoImage' fill />
    </div>
  )
}

export default LogoFull