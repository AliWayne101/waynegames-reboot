import React from 'react'
import { IconType } from 'react-icons'

interface MessageProps {
    Ico: IconType;
    Text: string;
}

const ShowMessage: React.FC<MessageProps> = ({ Ico, Text }) => {
    return (
        <div className="mt-10 mb-10">
            <div className="flex items-center justify-center">
                {<Ico size={96} />}
            </div>
            <div className="text-center">
                {Text}
            </div>
        </div>
    )
}

export default ShowMessage