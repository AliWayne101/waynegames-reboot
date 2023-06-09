import Image from 'next/image';
import React from 'react'
import PaymentOptions from './PaymentOptions';
import { IGame } from '@/schemas/GameSchema';
import { RiComputerFill } from 'react-icons/ri';
import { SiSteam, SiUbisoft, SiEpicgames } from 'react-icons/si';

const Entry = ({ entry, id }: { entry: IGame, id: number }) => {
  return (
    <div className="w-full rounded-lg" id={`${id}`}>
      <div className='relative pl-1 sm:pl-5 pr-1 sm:pr-5'>
        <Image src={entry.image} alt={entry.name} fill className='entryImage height-fixed rounded-lg shadow-2xl' />
      </div>
      <div className="tsize-gtitle p-2 pt-5">{entry.name}</div>
      <div className="flex flex-wrap sm:justify-between p-2 tsize-small">
        <div>{entry.genre}</div>
        <div>
          {entry.discounted === 0 ? (
            <span className="mr-1">{entry.price}</span>
          ) : (
            <>
              <span className="line-through mr-1">{entry.price}</span> <span className="mr-1">{entry.discounted}</span>
            </>
          )}
          Rupees
        </div>
      </div>
      <div className="flex flex-wrap sm:justify-between p-2 mb-5">
        <div className='flex'>{entry.platform === "PC" ? (<RiComputerFill size={20} className='mr-2' />) : entry.platform} {Icon(entry.host)}</div>
        <div className='tsize-small flex'>Shop: &nbsp;<PaymentOptions size={20} /></div>
      </div>
    </div>
  )
}

const Icon = (_host: string) => {
  var ICON = null;
  switch (_host) {
    case "STEAM":
      ICON = <SiSteam size={20} />
      break;
    case "EPIC":
      ICON = <SiEpicgames size={20} />
      break;
    case "UBISOFT":
      ICON = <SiUbisoft size={20} />
      break;
    case "GOG":
      ICON = "GOG";
      break;
    default:
      ICON = "NULL";
      break;
  }
  return ICON;
}

export default Entry