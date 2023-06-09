import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AdminProps } from './admin'
import { useSession } from 'next-auth/react'
import { IGame } from '@/schemas/GameSchema'
import axios from 'axios'
import { useRouter } from 'next/router'

const Profile = ({ email }: AdminProps) => {
    const router = useRouter();
    const [gameList, setGameList] = useState<IGame[]>([]);

    useEffect(() => {
        console.log(`TargetEmail: ${email}`);
        axios
        .post('/api/getgames', {
            reqType: "GETUSERGAMES",
            targetEmail: email
        })
        .then((response) => {
            console.log(response);
            setGameList(response.data.docs);
        })
        .catch((err) => {
            console.log(err);
            router.push('/');
        })
    }, [email]);

    return (
        <>
            <Navbar />
            <main>
                <div className="grid sm:grid-cols-4 grid-cols-1 gap-3">
                    <div className="col-span-1">
                        <div className="p-10">
                            <Image src={'/assets/samples/gow.jpg'} alt='game' className='previewImage rounded shadow-2xl' fill />
                        </div>
                        <div className="grid grid-cols-2 mb-5 pl-5 pr-5 text-center">
                            <div>Username</div>
                            <div>Ali</div>
                            <div>Password</div>
                            <div>Ali Password</div>
                        </div>
                    </div>
                    <div dir='ltr' className="col-span-3 pt-10 pb-10 pl-5 pr-5">
                        <div className="border-s-4 h-full p-5 border-indigo-500">
                            <div className="grid sm:grid-cols-5 grid-cols-2">

                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Profile;

export const getServerSideProps: GetServerSideProps<AdminProps> = async (context) => {
    const { data: session } = useSession();
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            },
            props: {}
        }
    }

    if (!session.user) {
        return { 
            redirect: {
                destination: "/",
                permanent: false
            },
            props: {}
        }
    }

    return {
        props: {
            email: session.user.email!
        }
    }
}