export default function Event() {
    return <>
    <main className=" absolute top-0 z-40 flex  w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-fit h-fit max-w-[70vw] max-h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
            <div id="recherche" className="flex flex-row items-center self-center">
                <button className="flex flex-row items-center gap-2 bg-[--primary] px-4 py-2 rounded-lg mr-8" >
                    <svg
                    className="w-3 h-3"
                    width="211"
                    height="361"
                    viewBox="0 0 211 361"
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <rect width="211" height="47" fill="#D9D9D9"/>
                        <path d="M129 150V291C129 329.66 97.6599 361 59 361V361V150H129Z" fill="#D9D9D9"/>
                        <path d="M59.5646 150L0 47H211L129.225 150H59.5646Z" fill="#D9D9D9"/>
                    </svg>
                <span>Trier</span>
                </button>
                <div className="relative">
                    <input type="search" className="w-96 h-10 px-3 border-slate-700 border-2 rounded-lg" placeholder="Search..." />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                        <img className="w-6 h-6" src="/icones/loop.svg" alt="Search Icon" />
                    </button>
                </div>
            </div>
            <div id="eventListe" className="flex flex-col gap-6 max-w-[80%] self-center">
            <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
                <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
                    <img className="w-24 h-24" src="icones/logoSimple.svg" alt="img_evenement" />
                    <span className="text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. 
                    </span>
                    <span className="border-l-2 pl-10 border-black text-wrap text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </span>
                </div>
           </div>
        </section>
    </main>
    </>
}