import React from 'react'

const Button = ({sizeClass, text}: {sizeClass: string, text: string}) => {
  return (
    <span className={`button ${sizeClass} cursor-pointer text-theme-secondary duration-300 hover:rounded`}>
        <span className="link">{text}</span>
    </span>
  )
}

export default Button