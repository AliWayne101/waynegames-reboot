import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from '@/components/Button'
import { IGame } from '@/schemas/GameSchema'

const Highlight = ({game, index}: {game: IGame, index: number}) => {
    return (
        <div className="highlight-container">
            <div className="inside-highlight shadow-2xl py-5p">
                <div className="grid grid-cols-4 gap-5 sm:pb-1 pb-10">
                    <div className='h-full sm:col-span-3 col-span-4 flex items-center'>
                        <div className="flex flex-col">
                            <h1 className="giant">Sale: unbeatable discount awaits!</h1><br />
                            <h2 className="text-[var(--text-alert)] egiant">{((game.price - game.discounted) / game.price) * 100} % Off</h2>
                            <h1 className="giant"><span className="line-through">{game.price}</span> <span className="egiant text-[var(--text-alert)]">{game.discounted}</span> Rupees</h1><br />
                            <div className="mt-10 mb-10 sm:mb-1">
                                <Link href={`/#${index}`}>
                                    <Button sizeClass={'giant'} text={'Purchase Now!'} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='sm:col-span-1 col-span-4'>
                        <Image src={game.image} alt={game.name} fill className='entryImage rounded-lg shadow-2xl'></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Highlight