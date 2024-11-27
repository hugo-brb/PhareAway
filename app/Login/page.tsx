export default function Login(){
    return <>
        <main className=" land flex justify-center items-center w-[100vw] h-[100vh]">
            <section className=" flex flex-col gap-12 bg-white bg-opacity-80 rounded-lg px-20 py-12 backdrop-blur-md">
                <h1 className=" font-ouroboros text-4xl self-center">Connexion</h1>
                {/*TODO: Vérification de connexion*/}
                <form action="/Home" method="post" className=" flex flex-col gap-7"> 
                    <div className=" flex flex-col gap-1 ">
                        <label htmlFor="id" className=" ml-2 text-base font-bold">Identifiant</label>
                        <input className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="text" placeholder="phareaway@lighthouse.fr" />
                    </div>
                    <div className=" flex flex-col gap-1">
                        <label htmlFor="mdp" className=" ml-2 text-base font-bold">Mot de passe</label>
                        <input className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]" type="password" placeholder="Monsupermotdepasse38" />
                    </div>
                    <input type="submit" value="C'est Phareti !" className=" hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg" />
                    <div className=" flex items-center gap-2">
                        <label htmlFor="signup">Vous n'avez toujours pas de compte ?!</label>
                        <a href="/Signup" className=" text-[--primary] font-bold">Inscrivez-vous</a>
                    </div>
                </form>
            </section>
        </main>
    </>
}