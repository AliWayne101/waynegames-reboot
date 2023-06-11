import React from 'react'
import { IconType } from 'react-icons'

interface MessageProps {
    Ico: IconType;
    Text: string;
}

const ShowMessage: React.FC<MessageProps> = ({ Ico, Text }) => {
    return (
        <>
            <div className="mt-10 mb-10 text-center">
                {<Ico size={48} />}
                {Text}
            </div>
        </>
    )
}

export default ShowMessage