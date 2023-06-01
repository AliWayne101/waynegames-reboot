import React from 'react'
import Image from 'next/image'
import PaymentOptions from '@/components/PaymentOptions'
import Link from 'next/link'

const Highlight = () => {

    //add entrySchema as a parameter
    return (
        <div className="highlight-container">
            <div className="inside-highlight shadow-2xl py-5p">
                <div className="grid grid-cols-4 gap-5">
                    <div className='h-full sm:col-span-3 col-span-4 flex items-center'>
                        <div className="flex flex-col">
                            <h1 className="giant block">Sale: unbeatable discount awaits!</h1><br />
                            <h2 className="text-[var(--text-alert)] egiant">10% Off</h2>
                            <h1 className="giant"><span className="line-through">5500</span> <span className="egiant text-[var(--text-alert)]">500</span> Rupees</h1><br />
                            <h1 className="giant"><Link href={'#'} className="link">Purchase Now!</Link></h1>
                        </div>
                    </div>
                    <div className=''>
                        <Image src={'/assets/samples/gow.jpg'} alt={'gow'} fill className='entryImage rounded-lg shadow-2xl'></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Highlight