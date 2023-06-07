import Logo from '@/components/Logo'
import Link from 'next/link'
import React from 'react'
import { FiGithub } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const Navbar = () => {

    const { data: session } = useSession();
    console.log(session);

    return (
        <div className="sticky top-0 flex justify-between bg-secondary tsize-menu mb-5 z-10 blur-nav">
            <div className="pl-5 pt-2 pb-2 flex">
                <div className='mr-10'> <Link href={'/'}> <Logo /> </Link></div>
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
                                    className='rounded-full cursor-pointer'
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