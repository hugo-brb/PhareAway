import Link from "next/link"

export default function Signup(){
    return <>
        <main className=" land flex justify-center items-center w-[100vw] h-[100vh]">
            <section className=" flex flex-col gap-7 bg-white bg-opacity-80 rounded-lg px-20 py-12 backdrop-blur-md">
                <Link href="/Rgpd" className=" -mb-8">
                    <button className=" hover:text-[--primary] self-start text-3xl font-extrabold duration-300 ease-in-out">&#129044;</button>
                </Link>
                <h1 className=" font-ouroboros text-4xl self-center">Rejoignez-nous !</h1>
                <form action="/Home" method="post" className=" flex flex-col gap-3 max-h-[90vh]">
                    <div className=" flex justify-between items-center gap-2">
                        <div className=" flex flex-col gap-1 ">
                            <label htmlFor="nom" className=" ml-2 text-base font-bold">Nom</label>
                            <input id="nom" name="nom" className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="text" placeholder="Soleil" />
                        </div>
                        <div className=" flex flex-col gap-1 ">
                            <label htmlFor="prenom" className=" ml-2 text-base font-bold">Prénom</label>
                            <input id="prenom" name="prenom" className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="text" placeholder="François" />
                        </div>
                    </div>
                    <div className=" flex flex-col gap-1 ">
                        <label htmlFor="user" className=" ml-2 text-base font-bold">Nom d'utilisateur</label>
                        <input id="user" name="user" className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="text" placeholder="Pharaon" />
                    </div>
                    <div className=" flex flex-col gap-1 ">
                        <label htmlFor="email" className=" ml-2 text-base font-bold">Email</label>
                        <input id="email" name="email" className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="text" placeholder="phareaway@lighthouse.fr" />
                    </div>
                    <div className=" flex flex-col gap-1">
                        <label htmlFor="mdp" className=" ml-2 text-base font-bold">Mot de passe</label>
                        <input id="mdp" name="mdp" className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="password" placeholder="Jaimelesphares38" />
                    </div>
                    <div className=" flex flex-col gap-1">
                        <label htmlFor="mdpVerif" className=" ml-2 text-base font-bold">Confirmer votre mot de passe</label>
                        <input id="mdpVerif" name="mdpVerif" className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="password" placeholder="Jaimelesphares38" />
                    </div>
                    <input type="submit" value="Commencer mon aventure ⛵" className=" hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg" />
                    <div className=" flex justify-center items-center gap-2">
                        <label htmlFor="login">Vous avez déjà un compte !</label>
                        <Link href="/Login" className=" text-[--primary] font-bold">Connectez-vous ♥</Link>
                    </div>
                    <div className=" flex justify-center items-center gap-2">
                        <Link href="/Login" className=" text-[--primary] font-bold">Je suis une association</Link>
                    </div>
                </form>
            </section>
        </main>
    </>
}