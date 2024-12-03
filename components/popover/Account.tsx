import Image from "next/image"

interface MenuProps {
    active: string;
    handleClickActive: (a: string) => void;
}

export default function Account({ active, handleClickActive }: MenuProps) {
    return <>
    <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-fit h-fit max-h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
            <div className=" flex justify-center items-center gap-32">
                <Image src="/images/profile.jpg" alt="Profile picture" width={200} height={100} className=" rounded-full"></Image>
                <div className=" flex flex-col gap-2">
                    <h1 className=" font-extrabold text-5xl">François Soleil</h1>
                    <h2 className=" text-lg">phareaway@lighthouse.fr</h2>
                    <div className=" flex justify-around">
                        <div onClick={() => handleClickActive('coin')} className=" flex items-center gap-2 border border-[--text] rounded-full mt-7 py-1 px-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-[--accent] size-5">
                                <path d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2c0 0 0 0 0 0s0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4l0 3.4 0 5.7 0 26.3zm32 0l0-32 0-25.9c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5l0 35.4c0 44.2-86 80-192 80S0 476.2 0 432l0-35.4c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"/>
                            </svg>
                            <p>1000</p>
                        </div>
                        <div onClick={() => handleClickActive('home')} className=" flex items-center gap-2 border border-[--text] rounded-full mt-7 py-1 px-4 cursor-pointer">
                            <Image src="/images/lighthouse.png" width={30} height={30} alt="icon de phare"></Image>
                            <p>2/256</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" w-[60vw] border-[--text]" />
            <div className=" flex flex-col gap-12 pl-7 mx-auto px-7 py-12">
                <div className=" flex gap-12">
                    <div className=" flex flex-col gap-1">
                        <h3 className=" font-bold text-xl">Nom</h3>
                        <input type="text" defaultValue="Soleil" className=" py-2 px-4 w-fit rounded-full bg-white bg-opacity-45" disabled />
                    </div>
                    <div className=" flex flex-col gap-1">
                        <h3 className=" font-bold text-xl">Prénom</h3>
                        <input type="text" defaultValue="François" className=" py-2 px-4 w-fit rounded-full bg-white bg-opacity-45" disabled />
                    </div>
                </div>
                <div className=" flex flex-col gap-1">
                    <h3 className=" font-bold text-xl">Nom d'utilisateur</h3>
                    <input type="text" defaultValue="Pharaon" className=" py-2 px-4 w-full rounded-full bg-white bg-opacity-45" disabled />
                </div>
                <div className=" flex flex-col gap-1">
                    <h3 className=" font-bold text-xl">Email</h3>
                    <input type="mail" defaultValue="phareaway@lighthouse.fr" className=" py-2 px-4 w-full rounded-full bg-white bg-opacity-45" disabled />
                </div>
                <div className=" flex flex-col gap-1">
                    <h3 className=" font-bold text-xl">Mot de passe</h3>
                    <input type="password" defaultValue="Jaimelesphares38" className=" py-2 px-4 w-full rounded-full bg-white bg-opacity-45" disabled />
                </div>
                <button className=" w-[15vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold mx-auto py-2 px-6 rounded-2xl">Modifier</button>
            </div>
            
        </section>
    </main>
    </>
}