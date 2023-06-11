import LogoFull from '@/components/LogoFull'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className="p-10 justify-center text-center mt-10 footer">
        {/* <div className="mt-5 mb-5">
            <LogoFull />
        </div> */}
        <div>Developed by <Link href={'https://waynedev.vercel.app'} className='link' target='_blank'>Wayne Development</Link></div>
        <div>Copyright © 2023 Games Heaven. All rights reserved.</div>
    </div>
  )
}

export default Footer