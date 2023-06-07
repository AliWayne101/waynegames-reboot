import Logo from '@/components/Logo'
import Link from 'next/link'
import React from 'react'
import { RiLoginCircleFill } from 'react-icons/ri'
import { FiGithub } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Navbar = () => {

    const { data: session } = useSession();

    return (
        <div className="sticky top-0 flex justify-between bg-secondary tsize-menu mb-5 z-10 blur-nav">
            <div className="pl-5 pt-2 pb-2 flex">
                <div className='mr-10'> <Link href={'/'}> <Logo /> </Link></div>
                {/* <div className="p-2 menu-icon ml-2 pl-5 pr-5 rounded hidden sm:flex mt-4 mb-4">
                <SiSteam size={22} className='menu-icon'/>
            </div>
            <div className="p-2 menu-icon ml-2 pl-5 pr-5 rounded hidden sm:flex mt-4 mb-4">
                <SiEpicgames size={22} className='menu-icon'/>
            </div>
            <div className="p-2 menu-icon ml-2 pl-5 pr-5 rounded hidden sm:flex mt-4 mb-4">
                <SiUbisoft size={22} className='menu-icon'/>
            </div> */}
            </div>
            <div className="pr-5 pt-2 pb-2 flex mt-4">
                {
                    session ? (
                        session.user && (
                            <>
                                <Image
                                    src={
                                        session.user.image
                                            ? session.user.image
                                            : "https://i.ibb.co/2NdhGP1/Profile-avatar-placeholder-large.png"
                                    }
                                    height={40}
                                    width={40}
                                    className='rounded-full'
                                    alt='profile'
                                    onClick={() => signOut()}
                                    title='Sign out'
                                />
                                <Link href={'/admin'}>{session.user.name}</Link>
                            </>
                        )
                    ) : (
                        <span className='cursor-pointer flex' onClick={() => signIn('github')}><FiGithub size={32} />&nbsp;Login</span>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar