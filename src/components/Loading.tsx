import React from 'react'
import { BarLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div className="mt-5 mb-5 w-full text-center flex items-center justify-center">
        <BarLoader color='var(--text-theme)' />
        <p className='pl-2 text-[var(--text-theme)]'>Please wait...</p>
    </div>
  )
}

export default Loading