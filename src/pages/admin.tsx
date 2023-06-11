import Button from '@/components/Button'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import React, { useEffect, useState } from 'react'
import { JSONData, Superusers, webDetails } from '@/Details'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { IGame } from '@/schemas/GameSchema'


export interface AdminProps {
    userEmail: string,
}

const Admin = ({ userEmail }: AdminProps) => {

    const router = useRouter();
    const [entryData, setEntryData] = useState({
        title: "",
        image: "",
        genre: "",
        platform: "",
        host: "",
        price: 0,
        discounted: 0,
        quantity: 0,
        gameData: [] as JSONData[],
        uploadedBy: userEmail,
        bgImage: "",
    });

    const [generateEntry, setGenerateEntry] = useState({
        title: "",
        email: "",
    });

    const [isError, setIsError] = useState("null");

    const [isUploaded, setIsUploaded] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [gameList, setGameList] = useState<IGame[]>([]);
    const [isGenerated, setIsGenerated] = useState("null");

    const updateGameList = () => {
        setShowLoading(true);
        console.log('Updating games list');
        axios
            .post("/api/getgames", {
                reqType: "GETGAMES"
            })
            .then((response) => {
                setShowLoading(false);
                console.log(response.data);
                if (response.data.exists)
                    setGameList(response.data.gamelist);
            })
            .catch(console.log);
    }

    useEffect(() => {
        if (showForm === false) {
            updateGameList();
        }
    }, [showForm])

    const updateEntry = (e: HTMLInputElement | HTMLSelectElement) => {
        setEntryData({
            ...entryData, [e.name]: e.value
        });
    }

    const genEntry = (e: HTMLInputElement | HTMLSelectElement) => {
        setGenerateEntry({
            ...generateEntry, [e.name]: e.value
        });
    }

    const readJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        if (e.target) {
                            const parsedData = JSON.parse(e.target.result as string) as JSONData[];
                            setEntryData({
                                ...entryData,
                                quantity: parsedData.length,
                                gameData: parsedData
                            });
                            console.log('GameData: ');
                            console.log(entryData.gameData);
                            if (parsedData.length === 0) {
                                setIsError("Invalid JSON Data..");
                            }
                        }
                    } catch (ex) {
                        console.log(`Error parsing: ${ex}`);
                        setIsError('Unable to parse the JSON Data');
                    }
                }
                reader.readAsText(file);
            }
        }
    }

    const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files[0]) {
            console.log(files[0]);
            const formData = new FormData();
            var imageFile = files[0] as File;
            formData.append('image', imageFile);
            axios.post('/imgbb/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    key: process.env.NEXT_PUBLIC_IMG_BB!
                }
            })
                .then((response) => {
                    setIsUploaded(true);
                    setEntryData({
                        ...entryData, [e.target.name]: response.data.data.url
                    });
                })
                .catch((err) => {
                    console.log(`Error has been detected: ${err}`);
                    setIsError(err);
                });
        }
    }

    const uploadGames = () => {
        axios
            .post('/api/writegames', {
                ...entryData
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.created)
                    router.push('/');
            })
            .catch(console.log);
    }

    const GenerateLink = () => {
        axios
            .post('/api/tokens', {
                reqType: "GENTOKEN",
                tokenID: "null",
                ...generateEntry
            })
            .then((response) => {
                if (response.data.created)
                    setIsGenerated(response.data.doc.tokenID);
            })
            .catch(console.log);
    }

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-2 mt-10 mb-10">
                <div className='flex justify-center'>
                    <span onClick={() => setShowForm(true)}><Button sizeClass={'tsize-menu'} text={'Add new game'} /></span>
                </div>
                <div className='flex justify-center'>
                    <span onClick={() => setShowForm(false)}><Button sizeClass={'tsize-menu'} text={'Generate Link'} /></span>
                </div>
            </div>

            <div className="w-full mt-10 p-4">
                {showForm ? (
                    <>
                        <div className="giant">Add new game</div>
                        <div className="mt-5">
                            <span>Game Title: </span>
                            <input type="text" name="title" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => updateEntry(e.currentTarget)} />
                        </div>
                        <div className="mt-5">
                            <span>Game Poster Image:</span>
                            <input type="file" name="image" id="image" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={photoUpload} />
                        </div>
                        <div className="mt-5">
                            <span>Game Background Image:</span>
                            <input type="file" name="bgImage" id="bgImage" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={photoUpload} />
                        </div>
                        <div className="mt-5">
                            <span>Game Genre: </span>
                            <input type="text" name="genre" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => updateEntry(e.currentTarget)} />
                        </div>
                        <div className="mt-5">
                            <span>Game Platform: </span>
                            <input type="text" name="platform" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => updateEntry(e.currentTarget)} />
                        </div>
                        <div className="mt-5">
                            <span>Game Host: </span>
                            <select name="host" id="host" className='bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block' onChange={(e) => updateEntry(e.currentTarget)}>
                                <option value="STEAM" className='text-black'>SELECT HOST</option>
                                <option value="STEAM" className='text-black'>STEAM</option>
                                <option value="EPIC" className='text-black'>EPIC</option>
                                <option value="UBISOFT" className='text-black'>UBISOFT</option>
                                <option value="GOG" className='text-black'>GOG</option>
                            </select>
                        </div>
                        <div className="mt-5">
                            <span>Game Price: </span>
                            <input type="number" name="price" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => updateEntry(e.currentTarget)} />
                        </div>
                        <div className="mt-5">
                            <span>Discounted Price: </span>
                            <input type="number" name="discounted" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => updateEntry(e.currentTarget)} />
                        </div>
                        <div className="mt-5">
                            <span>Game Data JSON:</span>
                            <input type="file" name="gameData" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={readJSON} />
                        </div>
                        {isUploaded && (
                            isError === "null" ? (
                                <span className='mt-5 block' onClick={() => uploadGames()}><Button sizeClass={'tsize-small'} text={'Add game'} /></span>
                            ) : (
                                <span className="mt-5 block text-[var(--text-alert)]">{isError.toString()}</span>
                            )
                        )}
                    </>
                ) : (
                    isGenerated !== "null" ? (
                        <div className="w-full text-center mt-5">Link has been generated <br /> Link: {webDetails.address}/token/{isGenerated}</div>
                    ) : (
                        <>
                            <div className="mt-5">
                                <span>Game Title</span>
                                {showLoading === false && (
                                    <select name="title" id="title" className='bg-transparent w-full sm:w-[50%] p-2 firaCode border border-1 block' onChange={(e) => genEntry(e.currentTarget)}>
                                        <option value="" className="text-black"></option>
                                        {gameList.map((game, index) => (
                                            <option value={game.name} className="text-black" key={index}>{game.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className="mt-5">
                                <span>Email Address: </span>
                                <input type="email" name="email" className="bg-transparent w-full sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => genEntry(e.currentTarget)} />
                            </div>
                            <span className="mt-5 block" onClick={() => GenerateLink()}><Button sizeClass='tsize-small' text='Generate Link' /></span>
                        </>
                    )

                )}



            </div>
            <Footer />
        </>
    )
}

export default Admin;

export const getServerSideProps: GetServerSideProps<AdminProps> = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {}
        }
    }

    let userEmail = "null";

    if (session && session.user) {
        try {
            Superusers.map((user) => {
                if (user.email === session.user?.email)
                    userEmail = session.user.email;
            })
        } catch (err) {
            console.log(err);
        }
    }

    if (userEmail === "null") {
        return {
            redirect: {
                destination: '/',
                permanent: false
            },
            props: {}
        }
    }

    return {
        props: {
            userEmail
        }
    }
}