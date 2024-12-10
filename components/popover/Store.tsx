import Image from "next/image"

export default function Coin() {
    return <>
    <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-fit h-fit max-h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
           <h1 className=" font-gravitas self-center text-7xl">Boutique</h1> 
           <div className=" flex flex-col">
            <h2 className=" text-[--primary] text-lg px-5 py-2">Beacoins</h2>
            <div className=" flex flex-col ring-2 ring-[--primary] rounded-xl w-[70vw] py-5">
                    <div className=" flex ml-7 justify-around">
                        <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
                            <Image src="/images/BeaCoin.png" width={100} height={100} alt="Beacoin"/>
                            <div className=" flex flex-col justify-center items-center">
                                <p>10 Beacoins</p>
                                <p className=" opacity-50">10€</p>
                            </div>
                        </div>

                        <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
                            <Image src="/images/BeaCoin.png" width={100} height={100} alt="Beacoin"/>
                            <div className=" flex flex-col justify-center items-center">
                                <p>100 Beacoins</p>
                                <p className=" opacity-50">20€</p>
                            </div>
                        </div>

                        <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
                            <Image src="/images/BeaCoin.png" width={100} height={100} alt="Beacoin"/>
                            <div className=" flex flex-col justify-center items-center">
                                <p>1.000 Beacoins</p>
                                <p className=" opacity-50">50€</p>
                            </div>
                        </div>

                        <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
                            <Image src="/images/BeaCoin.png" width={100} height={100} alt="Beacoin"/>
                            <div className=" flex flex-col justify-center items-center">
                                <p>10.000 Beacoins</p>
                                <p className=" opacity-50">100€</p>
                            </div>
                        </div>
                    </div>
            </div>
           </div>

           <div className=" flex flex-col">
                <h2 className=" text-[--primary] text-lg px-5 py-2">Extensions</h2>
                <div className=" flex flex-col ring-2 ring-[--primary] rounded-xl w-[70vw] py-5">
                    <div className=" flex ml-7 justify-center gap-24">
                        <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
                            <Image src="/images/Corse.png" width={100} height={100} alt="Corse"/>
                            <div className=" flex flex-col justify-center items-center">
                                <p>Corse</p>
                                <p className=" opacity-50">100 Beacoins</p>
                            </div>
                        </div>

                        <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
                            <Image src="/images/Dom.png" width={100} height={100} alt="Dom-Tom"/>
                            <div className=" flex flex-col justify-center items-center">
                                <p>Dom-Tom</p>
                                <p className=" opacity-50">1.000 Beacoins</p>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           <p className=" opacity-70">
            *30% des bénéfices engendrés par la boutique seront reversés à des associations de protection des phares.
           </p>
        </section>
    </main>
    </>
}