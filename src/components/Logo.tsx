import React from 'react'
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="relative">
        <Image src={'/assets/logo.png'} alt='logo' className='logoImage' fill />
    </div>
  )
}

export default Logo