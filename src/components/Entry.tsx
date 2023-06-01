import Image from 'next/image';
import React from 'react'
import PaymentOptions from './PaymentOptions';
import { entryProps } from '@/schemas/EntrySchema';

const Entry = ({entry, id}: {entry: entryProps, id: number}) => {
  return (
    <div className="w-full rounded-lg" id={`${id}`}>
        <div className='relative pl-1 sm:pl-5 pr-1 sm:pr-5'>
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