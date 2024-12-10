'use client'

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { useState } from "react"

export default function Rgpd(){
    const [flipped, setFlipped] = useState(false);
    const [email, setEmail] = useState(false);
    const [name, setName] = useState(false);
    const [age, setAge] = useState(false);
    const [accept, setAccept] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleEmail = () => {
        setEmail(prev => !prev);
    };

    const handleName = () => {
        setName(prev => !prev);
    };

    const handleAge = () => {
        setAge(prev => !prev);
    };

    const handleAccept = () => {
        setAccept(prev => !prev);
    };

    const handleFlipped = () => {
        setFlipped(prev => !prev);
    };

    const verif = () => {
        if(email && name && age && accept){
            redirect("/Signup");
        }else{
            setErrorMessage("Toutes les conditions doivent être validées pour pouvoir continuer l'inscription...");
        }
    }

    return <>
        <main className=" land flex justify-center items-center w-[100vw] h-[100vh] font-bold">
            <section className="flex flex-col gap-7 bg-white bg-opacity-80 rounded-lg px-20 py-12 backdrop-blur-md">
                <h1 className=" font-ouroboros text-4xl self-center">Vos Pharedonnées !</h1>
                {!flipped && (<form action="/Signup" method="post" className=" flex flex-col gap-3 max-h-[90vh]">
                    <p onClick={handleFlipped} className=" text-[--primary] cursor-pointer flex items-center gap-2 underline underline-offset-2">En savoir plus sur l'utilisation de vos données
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className=" fill-[--primary] size-4 -rotate-45"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    </p>

                    <hr />

                    <div className=" flex flex-col gap-5">
                        <div className=" flex justify-between items-center w-full">
                            <label htmlFor="useMail" className=" max-w-[25vw]">Permettre l'utilisation de votre adresse mail pour créer et vérifier votre compte.</label>
                            <label
                            className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-700 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[--primary]"
                            >
                            <input className="peer sr-only" id="AcceptConditions" type="checkbox" onClick={handleEmail} />
                            <span
                                className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-700 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
                            ></span>
                            </label>
                        </div>
                        <div className=" flex justify-between items-center w-full">
                            <label htmlFor="useName" className=" max-w-[25vw]">Permettre de collecter votre Nom et prénom pour créer votre compte.</label>
                            <label
                            className="relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-700 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-[--primary]"
                            >
                            <input className="peer sr-only" id="AcceptConditions" type="checkbox" onClick={handleName} />
                            <span
                                className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-700 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
                            ></span>
                            </label>
                        </div>
                    </div>

                    <hr />

                    <div className=" flex flex-col gap-1">
                        <div className=" flex items-center gap-2">
                            <div className="flex items-center space-x-3">
                                <label className="group flex items-center cursor-pointer">
                                    <input className="hidden peer" type="checkbox" onClick={handleAge} />

                                    <span
                                    className="relative w-5 h-5 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 peer-checked:border-[--primary] peer-checked:bg-[--primary] peer-hover:scale-105"
                                    >
                                    <span
                                        className="absolute inset-0 bg-gradient-to-br to-white/10 from-white opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500 peer-checked:animate-pulse"
                                    ></span>

                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className="hidden w-5 h-5 peer-checked:block transition-transform duration-500 transform scale-50 peer-checked:scale-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        clipRule="evenodd"
                                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                        fillRule="evenodd"
                                        ></path>
                                    </svg>
                                    </span>

                                    <span
                                    className="ml-3 group-hover:text-[--primary] transition-colors duration-300"
                                    >
                                    Je cerfie avoir plus de 15ans et être un veritable pharaddict.
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className=" flex items-center gap-2">
                        <div className="flex items-center space-x-3">
                                <label className="group flex items-center cursor-pointer">
                                    <input className="hidden peer" type="checkbox" onClick={handleAccept} />

                                    <span
                                    className="relative w-5 h-5 flex justify-center items-center bg-gray-100 border-2 border-gray-400 rounded-md shadow-md transition-all duration-500 peer-checked:border-[--primary] peer-checked:bg-[--primary] peer-hover:scale-105"
                                    >
                                    <span
                                        className="absolute inset-0 bg-gradient-to-br to-white/10 from-white opacity-0 peer-checked:opacity-100 rounded-md transition-all duration-500 peer-checked:animate-pulse"
                                    ></span>

                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        className="hidden w-5 h-5 peer-checked:block transition-transform duration-500 transform scale-50 peer-checked:scale-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        clipRule="evenodd"
                                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                        fillRule="evenodd"
                                        ></path>
                                    </svg>
                                    </span>

                                    <span
                                    className="ml-3 group-hover:text-[--primary] transition-colors duration-300"
                                    >
                                    Je valide mes choix !
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-red-600 text-sm font-semibold">
                            {errorMessage}
                        </div>
                    )}
                    <div className=" flex flex-col gap-1">
                        <input onClick={verif} type="button" value="Continuer vers l'inscription &#10140;" className=" hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg" />
                        <p className=" text-[--accent] text-sm">* Toutes les conditions doivent-être validées pour pouvoir continuer l'inscritption...</p>
                    </div>
                    <div className=" flex justify-center items-center gap-2">
                        <label htmlFor="login">Vous avez déjà un compte !</label>
                        <Link href="/Login" className=" text-[--primary] font-bold cursor-pointer">Connectez-vous ♥</Link>
                    </div>
                </form>)}
                {flipped && (
                    <>
                    <p className=" max-w-[45vw]">
                        PhareAway est une application innovante et ludique qui vous invite à explorer les phares de France tout en découvrant leur histoire fascinante à travers des mini escape games captivants. 
                        <br /><br />
                        Afin de vous offrir une expérience personnalisée, nous collectons certaines de vos données nécessaires à la création et à la gestion de votre compte. Soyez assuré que ces informations ne seront utilisées que dans ce but précis : vous permettre de profiter pleinement de PhareAway. Nous garantissons qu’aucune donnée ne sera exploitée à des fins commerciales, ni pour l’envoi d’offres promotionnelles non sollicitées. 
                        <br /><br />
                        Veuillez noter que l’accès à PhareAway est réservé aux utilisateurs âgés de 15 ans et plus. Nous sommes engagés à protéger vos informations et à respecter votre vie privée pour une expérience de jeu en toute sérénité.
                    </p>
                    <button onClick={handleFlipped} className=" self-center w-32 py-2 px-4 text-xl font-bold rounded-3xl hover:bg-[--primary] hover:text-[--background] ring-2 ring-[--primary] duration-300 ease-in-out">Retour</button>
                </>
                )}
            </section>
        </main>
    </>
}
