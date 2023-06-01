import Logo from '@/components/Logo'
import React from 'react'
import { RiLoginCircleFill } from 'react-icons/ri'
import { SiEpicgames, SiUbisoft, SiSteam } from 'react-icons/si'

const Navbar = () => {
  return (
    <div className="sticky top-0 flex justify-between bg-secondary tsize-menu mb-10 z-10 blur-nav">
        <div className="pl-5 pt-2 pb-2 flex">
            <div className='mr-10'><Logo /></div>
            <div className="p-2 menu-icon ml-2 pl-5 pr-5 rounded hidden sm:flex mt-4 mb-4">
                <SiSteam size={22} className='menu-icon'/>
            </div>
            <div className="p-2 menu-icon ml-2 pl-5 pr-5 rounded hidden sm:flex mt-4 mb-4">
                <SiEpicgames size={22} className='menu-icon'/>
            </div>
            <div className="p-2 menu-icon ml-2 pl-5 pr-5 rounded hidden sm:flex mt-4 mb-4">
                <SiUbisoft size={22} className='menu-icon'/>
            </div>
        </div>
        <div className="pr-5 pt-2 pb-2 flex mt-4">
            <RiLoginCircleFill size={25} className='mt-1' />&nbsp;Login
        </div>
    </div>
  )
}

export default Navbar