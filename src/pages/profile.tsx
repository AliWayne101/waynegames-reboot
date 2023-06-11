import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AdminProps } from './admin'
import { getSession, signOut } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Superusers, gameProfileData } from '@/Details'
import Loading from '@/components/Loading'
import Link from 'next/link'
import ShowMessage from '@/components/ShowMessage'
import { TbError404 } from 'react-icons/tb'

const Profile = ({ email }: AdminProps) => {
    const router = useRouter();
    const [gameList, setGameList] = useState<gameProfileData[]>([]);
    const [selectedGame, setSelectedGame] = useState<gameProfileData | undefined>(undefined);
    const [isAdmin, setIsAdmin] = useState(false);
    const [gameLoading, setGameLoading] = useState(true);

    useEffect(() => {
        axios
            .post('/api/getgames', {
                reqType: "GETUSERGAMES",
                targetMail: email
            })
            .then((response) => {
                setGameLoading(false);
                setGameList(response.data.docs);
                if (response.data.docs.length > 0) {
                    setSelectedGame(response.data.docs[0]);
                }

            })
            .catch((err) => {
                console.log(err);
                router.push('/');
            });

        const isFound = Superusers.find((email) => email === email);
        if (isFound !== undefined)
            setIsAdmin(true);
    }, [email]);

    return (
        <>
            <Navbar />
            <main>
                <div className="text-right">
                    {isAdmin && (
                        <Link href={'/admin'} className='link mr-2'>Admin Panel</Link>
                    )}
                    <div className="link cursor-pointer" onClick={() => signOut()}>Logout</div>
                </div>
                <div className="grid sm:grid-cols-4 grid-cols-1 gap-3">
                    <div className="col-span-1">
                        {
                            gameLoading ? (
                                <Loading />
                            ) : (
                                selectedGame !== undefined && (
                                    <>
                                        <div className="p-10">
                                            <Image src={selectedGame.image} alt={selectedGame.title} className='previewImage rounded shadow-2xl' fill />
                                        </div>
                                        <div className="grid grid-cols-2 mb-5 pl-5 pr-5 text-center">
                                            <div>Username</div>
                                            <div className='link'>{selectedGame.owned.user}</div>
                                            <div>Password</div>
                                            <div className='link'>{selectedGame.owned.password}</div>
                                        </div>
                                    </>
                                )
                            )
                        }
                    </div>

                    <div dir='ltr' className="col-span-3 pt-10 pb-10 pl-5 pr-5">
                        <div className="border-s-4 h-full p-5 border-indigo-500">
                            {
                                gameLoading ? (
                                    <Loading />
                                ) : (
                                    gameList.length > 0 ? (
                                        <div className="grid sm:grid-cols-6 grid-cols-2">
                                            {gameList.map((game, index) => (
                                                <div className="w-full cursor-pointer" key={index} onClick={() => { setSelectedGame(game) }}>
                                                    <div className="p-5">
                                                        <Image src={game.image} alt={game.title} className='entryImage height-auto rounded shadow-2xl' fill />
                                                    </div>
                                                    <div className="text-center tsize-small">{game.title}</div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <ShowMessage Ico={TbError404} Text='Seems like you do not have any games activated yet!' />
                                    )
                                )
                            }

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
    const session = await getSession(context);
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