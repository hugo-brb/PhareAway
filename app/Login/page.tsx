/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session !== null) {
      console.log("Session existante -> Redirection en cours)");
      redirect("/Home");
    }
  }, [session]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        setError("Email ou mot de passe incorrect");
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la connexion");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="land flex justify-center items-center w-[100vw] h-[100vh]">
      <Image
        src="/icones/logoBaniere.png"
        alt="Logo"
        width={150}
        height={150}
        className=" absolute top-2 left-2"
      />
      <section className="flex flex-col max-w-[95vw] max-h-[95vh] gap-7 md:gap-12 bg-white bg-opacity-80 rounded-lg px-12 md:px-20 py-12 backdrop-blur-md">
        <Link href="/" className="absolute top-5 left-5">
          <Image
            src="/icones/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </Link>
        <h1 className="font-ouroboros text-4xl self-center">Connexion</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col gap-7"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="ml-2 text-base font-bold">
              Email
            </label>
            <input
              id="email"
              name="email"
              className="py-2 px-6 rounded-lg text-base md:text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              type="email"
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
              className="py-2 px-6 rounded-lg text-base md:text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              type="password"
              placeholder="Monsupermotdepasse38"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <button
              type="submit"
              disabled={loading}
              className={`hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Connexion..." : "C'est Phar'ti !"}
            </button>
          </div>

          <div className="flex items-center gap-2 md:text-base text-xs">
            <label htmlFor="signup">
              Vous n&apos;avez toujours pas de compte ?!
            </label>
            <Link href="/Rgpd" className="text-[--primary] font-bold">
              Inscrivez-vous
            </Link>
          </div>
        </form>
        <hr className=" border-[--text]" />
        <div className=" flex justify-center items-center w-full h-fit">
          <button
            onClick={() => signIn("google")}
            className="gsi-material-button"
          >
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
              <div className="gsi-material-button-icon">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className=" block"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  ></path>
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  ></path>
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  ></path>
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  ></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              </div>
              <span className="gsi-material-button-contents">
                Se connecter avec Google
              </span>
              <span className=" hidden">Se connecter avec Google</span>
            </div>
          </button>
        </div>
      </section>
    </main>
  );
}
