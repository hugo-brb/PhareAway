import React from 'react';
import Image from 'next/image';

type OneEvent = {
    image: string;
    desc: string;
    informations: [number, string, Date];
};

const OneEvent: React.FC<OneEvent> = ({ image, desc, informations }) => {
    return(
    <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
        <Image className="w-24 h-24" width={96} height={96} src={image} alt="img_evenement" />
        <span className="text-wrap text-center max-w-[50%]">
            {desc}
        </span>
        <span className="border-l-2 pl-10 border-black text-wrap text-center">
            Heure : {informations[0]} <br/>
            Lieu : {informations[1]} <br/>
            Date : {informations[2].toLocaleDateString()}
        </span>
    </div>
                )
}
export default OneEvent;