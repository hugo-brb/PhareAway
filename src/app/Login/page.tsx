'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from "next-auth/react";

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // Réinitialiser le message d'erreur
        setErrorMessage("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false, // Empêche la redirection automatique
            });

            if (result?.error) {
                // Gère l'erreur d'authentification
                setErrorMessage("Identifiants incorrects. Veuillez réessayer.");
            } else {
                // Redirige manuellement en cas de succès
                router.push("/Home");
            }
        } catch (error) {
            // Gère les erreurs de réseau ou autres
            setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
        }
    };

  return (
    <main className="land flex justify-center items-center w-[100vw] h-[100vh]">
      <section className="flex flex-col gap-12 bg-white bg-opacity-80 rounded-lg px-20 py-12 backdrop-blur-md">
        <h1 className="font-ouroboros text-4xl self-center">Connexion</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-7">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="ml-2 text-base font-bold">
              Identifiant
            </label>
            <input
              id="email"
              name="email"
              className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              type="text"
              placeholder="phareaway@lighthouse.fr"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="ml-2 text-base font-bold">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              type="password"
              placeholder="Monsupermotdepasse38"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
          {errorMessage && (
            <div className="text-red-600 text-sm font-semibold text-center">
                {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg"
          >
            C'est Phareti !
          </button>
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="signup">Vous n'avez toujours pas de compte ?!</label>
            <Link href="/Rgpd" className="text-[--primary] font-bold">
              Inscrivez-vous
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}
