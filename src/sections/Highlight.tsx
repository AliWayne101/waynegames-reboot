import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { IGame } from '@/schemas/GameSchema'

const Highlight = ({ game, gamelist }: { game: IGame, gamelist: IGame[] }) => {
    const [gameIndex, setGameIndex] = useState(gamelist.indexOf(game));

    useEffect(() => {
        gamelist.map((_Game, index) => {
            if (_Game.name === game.name)
                setGameIndex(index);
        })
    }, [game])

    return (
        <div className="highlight-container">
            <div className="customBG shadow-2xl">
                <div
                    className="customBG-image"
                    style={{ backgroundImage: `url(${game.bgImage})` }}
                ></div>
                <div className="customBG-overlay"></div>

                <div className="customBG-content py-5p">

                    <div className="grid grid-cols-4 gap-5 sm:pb-1 pb-10">
                        <div className="h-full sm:col-span-3 col-span-4 flex items-center">
                            <div className="flex flex-col">
                                <h1 className="giant">Sale: unbeatable discount awaits!</h1>
                                <br />
                                <h2 className="text-[var(--text-alert)] egiant">
                                    {parseInt((((game.price - game.discounted) / game.price) * 100).toString())}% Off
                                </h2>
                                <h1 className="egiant text-[var(--text-alert)] mt-2">{game.name}</h1>
                                <h1 className="giant">
                                    <span className="line-through">{game.price}</span>{' '}
                                    <span className="egiant text-[var(--text-alert)]">{game.discounted}</span> Rupees
                                </h1>
                                <br />
                                <div className="mt-10 mb-10 sm:mb-1">
                                    <Link href={`/#${gameIndex}`}>
                                        <Button sizeClass={'giant'} text={'Purchase Now!'} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-1 col-span-4">
                            <Image src={game.image} alt={game.name} fill className="entryImage rounded-lg shadow-2xl" />
                        </div>
                    </div>

                </div>

            </div>
        </div>

    )
}

export default Highlight