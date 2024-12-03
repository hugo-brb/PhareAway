import Image from "next/image"

interface MenuProps {
    active: string;
    handleClickActive: (a: string) => void;
}

export default function Coin({ active, handleClickActive }: MenuProps){
    return <>
    <div onClick={() => handleClickActive('coin')} className="flex items-center gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md px-4 py-2 absolute top-7 right-7 z-50 cursor-pointer hover:drop-shadow-2xl duration-300">
        <Image src="/images/BeaCoin.png" width={25} height={25} alt="Beacoin"/>
        <p>1000</p>
    </div>
    </>
}