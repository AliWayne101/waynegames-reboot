import React from 'react'
import Image from 'next/image'
import PaymentOptions from '@/components/PaymentOptions'
import Link from 'next/link'
import Button from '@/components/Button'

const Highlight = () => {

    //add entrySchema as a parameter
    return (
        <div className="highlight-container">
            <div className="inside-highlight shadow-2xl py-5p">
                <div className="grid grid-cols-4 gap-5 sm:pb-1 pb-10">
                    <div className='h-full sm:col-span-3 col-span-4 flex items-center'>
                        <div className="flex flex-col">
                            <h1 className="giant">Sale: unbeatable discount awaits!</h1><br />
                            <h2 className="text-[var(--text-alert)] egiant">10% Off</h2>
                            <h1 className="giant"><span className="line-through">5500</span> <span className="egiant text-[var(--text-alert)]">500</span> Rupees</h1><br />
                            <div className="mt-10 mb-10 sm:mb-1">
                                <Link href={'/#6'}>
                                    <Button sizeClass={'giant'} text={'Purchase Now!'} />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='sm:col-span-1 col-span-4'>
                        <Image src={'/assets/samples/gow.jpg'} alt={'gow'} fill className='entryImage rounded-lg shadow-2xl'></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Highlight