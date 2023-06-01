import Image from 'next/image';
import React, { ReactElement } from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'
import PaymentOptions from './PaymentOptions';
interface entryProps {
    name: string;
    image: string;
    genre: string;
    platform: ReactElement;
    price: number;
    originalPrice: number;
    quantity: number;
}

const Entry = ({entry}: {entry: entryProps}) => {
  return (
    <div className="w-full rounded-lg">
        <div className='relative'>
            <Image src={entry.image} alt={entry.name} fill className='entryImage rounded-lg shadow-2xl'/>
        </div>
        <div className="tsize-gtitle p-2 pt-5">{entry.name}</div>
        <div className="flex justify-between p-2 tsize-small">
            <div>{entry.genre}</div>
            <div>{entry.price} Rupees</div>
        </div>
        <div className="flex justify-between p-2 mb-5">
            <div>{entry.platform}</div>
            <div className='tsize-small flex'>Shop: &nbsp;<PaymentOptions size={20} /></div>
        </div>
    </div>
  )
}

export default Entry