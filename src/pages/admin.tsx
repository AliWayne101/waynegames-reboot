import Button from '@/components/Button'
import Footer from '@/sections/Footer'
import Navbar from '@/sections/Navbar'
import React, { useEffect, useState } from 'react'
import { JSONData, Superusers } from '@/Details'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'


interface AdminProps {
    email: string,
}

const Admin = () => {

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
        gameData: [] as JSONData[]
    });

    const [_photo, set_photo] = useState<File | null>();
    const [isUploaded, setIsUploaded] = useState(false);
    const [jsonData, setJsonData] = useState<JSONData[]>([]);

    const updateEntry = (e: HTMLInputElement | HTMLSelectElement) => {
        setEntryData({
            ...entryData, [e.name]: e.value
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
                            setJsonData(parsedData);
                            setEntryData({
                                ...entryData,
                                quantity: parsedData.length,
                                gameData: parsedData
                            });

                            console.log('GameData: ');
                            console.log(entryData.gameData);
                        }
                    } catch (ex) {
                        console.log(`Error parsing: ${ex}`);
                    }
                }
                reader.readAsText(file);
            }
        }
    }

    const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files[0])
            set_photo(files[0]);
    }

    useEffect(() => {
        if (_photo) {
            const formData = new FormData();
            formData.append('image', _photo);
            axios.post('https://api.imgbb.com/1/upload', formData, {
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
                    ...entryData, image: response.data.data.url
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [_photo]);

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
        if (isUploaded) {
            
        } else
            console.log("Please wait for image to be uploaded..");
    }

    return (
        <>
            <Navbar />
            <div className="grid grid-cols-2 mt-10 mb-10">
                <div className='flex justify-center'>
                    <Button sizeClass={'tsize-menu'} text={'Add new game'} />
                </div>
                <div className='flex justify-center'>
                    <Button sizeClass={'tsize-menu'} text={'Generate Link'} />
                </div>
            </div>

            <div className="w-full mt-10 p-4">
                <div className="giant">Add new game</div>
                <div className="mt-5">
                    <span>Game Title: </span>
                    <input type="text" name="title" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={(e) => updateEntry(e.currentTarget)} />
                </div>
                <div className="mt-5">
                    <span>Game Poster Image:</span>
                    <input type="file" name="posterFile" id="posterFile" className="bg-transparent w-[100%] sm:w-[50%] p-2 firaCode border border-1 block" onChange={photoUpload} />
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
                    <span className='mt-5 block' onClick={() => uploadGames()}><Button sizeClass={'tsize-small'} text={'Add game'} /></span>
                )}
            </div>

            <Footer />
        </>
    )
}

export default Admin;

export const getServerSideProps: GetServerSideProps<AdminProps> = async(context) => {
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

    if (userEmail === null) {
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
            email: userEmail
        }
    }
}