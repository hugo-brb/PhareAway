"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Signup() {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nom = formData.get("nom")?.toString().trim();
    const prenom = formData.get("prenom")?.toString().trim();
    const pseudo = formData.get("user")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("mdp")?.toString();
    const passwordConfirm = formData.get("mdpVerif")?.toString();

    const newErrors: string[] = [];

    // Validation des champs
    if (!nom) newErrors.push("Le nom est obligatoire.");
    if (!prenom) newErrors.push("Le prénom est obligatoire.");
    if (!pseudo) newErrors.push("Le nom d'utilisateur est obligatoire.");
    if (!email || !/\S+@\S+\.\S+/.test(email))
      newErrors.push("L'adresse email n'est pas valide.");
    if (!password) newErrors.push("Le mot de passe est obligatoire.");
    if (password !== passwordConfirm)
      newErrors.push("Les mots de passe ne correspondent pas.");
    //TODO Enlever le commentaire pour activer la vérification de la longueur du mot de passe
    /* if (password && password.length < 8)
      newErrors.push("Le mot de passe doit contenir au moins 8 caractères."); */

    setErrors(newErrors);

    if (newErrors.length === 0) {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          nom,
          prenom,
          pseudo,
          email,
          password,
        }),
      });
      if (response.ok) {
        redirect("/Login");
      } else {
        setErrors(["Une erreur est survenue lors de l'inscription."]);
      }
    }
  };

  return (
    <>
      <main className="land flex justify-center items-center w-[100vw] h-[100vh] max-h-[100vh]">
        <Image
          src="/icones/logoBaniere.png"
          alt="Logo"
          width={150}
          height={150}
          className="absolute top-2 left-2"
        />
        <section className="flex flex-col max-w-[95vw] max-h-[95vh] gap-7 bg-white bg-opacity-80 rounded-lg px-10 md:px-20 py-12 backdrop-blur-md overflow-y-scroll scrollbarhidden">
          <Link
            href="/Rgpd"
            className="absolute top-5 left-5 hover:scale-110 duration-300"
          >
            <Image
              src="/icones/arrow-back.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </Link>
          <h1 className="font-ouroboros text-3xl md:text-4xl self-center">
            Rejoignez-nous !
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-h-[90vh]"
          >
            <div className="flex flex-col md:flex-row md:justify-between justify-center md:items-center gap-2">
              <div className="flex flex-col gap-1 ">
                <label htmlFor="nom" className="md:ml-2 text-base font-bold">
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                  type="text"
                  placeholder="Soleil"
                />
              </div>
              <div className="flex flex-col gap-1 ">
                <label htmlFor="prenom" className="md:ml-2 text-base font-bold">
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  className=" w-full py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                  type="text"
                  placeholder="François"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="user" className="ml-2 text-base font-bold">
                Nom d&apos;utilisateur
              </label>
              <input
                id="user"
                name="user"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="text"
                placeholder="Pharaon"
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="email" className="ml-2 text-base font-bold">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="text"
                placeholder="phareaway@lighthouse.fr"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="mdp" className="ml-2 text-base font-bold">
                Mot de passe
              </label>
              <input
                id="mdp"
                name="mdp"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="password"
                placeholder="Jaimelesphares38"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="mdpVerif" className="ml-2 text-base font-bold">
                Confirmer votre mot de passe
              </label>
              <input
                id="mdpVerif"
                name="mdpVerif"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="password"
                placeholder="Jaimelesphares38"
              />
            </div>
            {errors.length > 0 && (
              <div className="text-red-600 mb-4">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <input
              type="submit"
              value="Commencer mon aventure ⛵"
              className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-lg md:text-xl font-bold py-2 px-6 rounded-lg"
            />
            <div className="flex justify-center items-center gap-2 text-xs md:text-base">
              <label htmlFor="login">Vous avez déjà un compte !</label>
              <Link href="/Login" className="text-[--primary] font-bold">
                Connectez-vous ♥
              </Link>
            </div>
            <div className="flex justify-center items-center gap-2 md:mb-0 mb-4">
              <Link href="/Asso" className="text-[--primary] font-bold">
                Je suis une association
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
