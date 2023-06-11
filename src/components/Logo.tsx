import React from 'react'
import Image from 'next/image';

const Logo = () => {
  return (

    // <div className="relative">
    //     <Image src={'/assets/logo.png'} alt='logo' className='logoImage' fill />
    // </div>

    <>
      <div className="hidden sm:flex egiant font-bold">
        Games Heaven
      </div>
      <div className="sm:hidden flex egiant font-bold">
        GH
      </div>
    </>
  )
}

export default Logo