"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Login from "../Login/page";

export default function Signup() {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState({
    nom: false,
    prenom: false,
    pseudo: false,
    email: false,
    mdp: false,
    mdpCourt: false,
    mdpdiff: false,
    global: false,
  });

  const confirmString = (t: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = t.target;

    if (value.length >= 17) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: true,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const nom = formData.get("nom")?.toString().trim();
    const prenom = formData.get("prenom")?.toString().trim();
    const pseudo = formData.get("user")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("mdp")?.toString();
    const passwordConfirm = formData.get("mdpVerif")?.toString();

    // Reset errors
    let hasErrors = false;
    const newErrors = {
      nom: false,
      prenom: false,
      pseudo: false,
      email: false,
      mdp: false,
      mdpCourt: false,
      mdpdiff: false,
      global: false,
    };

    // Validation
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = true;
      hasErrors = true;
    }

    if (password === pseudo || password === email) {
      newErrors.mdpdiff = true;
      hasErrors = true;
    }

    if (password !== passwordConfirm) {
      newErrors.mdp = true;
      hasErrors = true;
    }

    if (password && password.length < 8) {
      newErrors.mdpCourt = true;
      hasErrors = true;
    }

    setFormErrors(newErrors);

    // Only proceed if there are no errors
    if (!hasErrors) {
      try {
        const response = await fetch(`/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nom,
            prenom,
            pseudo,
            email,
            password,
          }),
        });

        if (response.ok) {
          router.push("/Login");
        } else {
          setFormErrors((prev) => ({ ...prev, global: true }));
        }
      } catch (error) {
        setFormErrors((prev) => ({ ...prev, global: true }));
        console.error(error);
      }
    }
  };

  return (
    <>
      <main className="land flex justify-center items-center w-[100vw] h-[100vh] max-h-[100vh]">
        <Link href="/" className=" absolute top-2 left-2">
          <Image
            src="/icones/logoBaniere.png"
            alt="Logo"
            width={150}
            height={150}
          />
        </Link>
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
            Rejoins-nous !
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 max-h-[90vh]"
          >
            <div className="flex flex-col md:flex-row md:justify-between justify-center md:items-center gap-2">
              <div className="flex flex-col gap-1 ">
                <span className="relative">
                  <label htmlFor="nom" className="md:ml-2 text-base font-bold">
                    Nom
                  </label>
                  <label className="md:ml-2 text-base font-bold text-red-500">
                    *
                  </label>

                  <p
                    className="absolute text-red-500 text-sm pl-2 pr-2"
                    style={{ top: "-5px", transform: "translateY(-100%)" }}
                  >
                    *Champ obligatoire
                  </p>
                </span>
                <input
                  id="nom"
                  name="nom"
                  onChange={confirmString}
                  className=" py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                  type="text"
                  placeholder="Soleil"
                  required
                />
                <p className="text-red-500">
                  {formErrors.nom ? "Le nom est trop long." : null}
                </p>
              </div>
              <div className="flex flex-col gap-1 ">
                <span>
                  <label
                    htmlFor="prenom"
                    className="md:ml-2 text-base font-bold"
                  >
                    Prénom
                  </label>
                  <label className="md:ml-2 text-base font-bold text-red-500">
                    *
                  </label>
                </span>
                <input
                  id="prenom"
                  name="prenom"
                  onChange={confirmString}
                  className=" w-full py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                  type="text"
                  placeholder="François"
                  required
                />
                <p className="text-red-500">
                  {formErrors.prenom ? "Le pseudo est trop long." : null}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <span>
                <label htmlFor="user" className="ml-2 text-base font-bold">
                  Nom d&apos;utilisateur
                </label>
                <label className="md:ml-2 text-base font-bold text-red-500">
                  *
                </label>
              </span>
              <input
                id="user"
                name="user"
                onChange={confirmString}
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="text"
                placeholder="Pharaon"
                required
              />
              <p className="text-red-500">
                {formErrors.pseudo ? "Le pseudo est trop long." : null}
              </p>
            </div>

            <div className="flex flex-col gap-1 ">
              <span>
                <label htmlFor="email" className="ml-2 text-base font-bold">
                  Email
                </label>
                <label className="md:ml-2 text-base font-bold text-red-500">
                  *
                </label>
              </span>
              <input
                id="email"
                name="email"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="text"
                placeholder="phareaway@lighthouse.fr"
                required
              />
              <p className="text-red-500">
                {formErrors.email ? "Le mail est invalide." : null}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span>
                <label htmlFor="mdp" className="ml-2 text-base font-bold">
                  Mot de passe
                </label>
                <label className="md:ml-2 text-base font-bold text-red-500">
                  *
                </label>
              </span>
              <input
                id="mdp"
                name="mdp"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="password"
                placeholder="Jaimelesphares38"
                required
              />
              <p className="text-red-500">
                {" "}
                {formErrors.mdpCourt
                  ? "Le mot de passe doit contenir au moins 8 caractères."
                  : formErrors.mdp
                  ? "Les mots de passe ne correspondent pas."
                  : null}{" "}
                {formErrors.mdpdiff &&
                  "Le mot de passe doit etre différent de l'email et du pseudo"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span>
                <label htmlFor="mdpVerif" className="ml-2 text-base font-bold">
                  Confirme ton mot de passe
                </label>
                <label className="md:ml-2 text-base font-bold text-red-500">
                  *
                </label>
              </span>
              <input
                id="mdpVerif"
                name="mdpVerif"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                type="password"
                placeholder="Jaimelesphares38"
              />
            </div>
            <input
              type="submit"
              value="Commencer mon aventure ⛵"
              className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-lg md:text-xl font-bold py-2 px-6 rounded-lg"
            />
            <div className="flex justify-center items-center gap-2 text-xs md:text-base">
              <label htmlFor="login">Tu as déjà un compte ?</label>
              <Link href="/Login" className="text-[--primary] font-bold">
                Connecte-toi ♥
              </Link>
            </div>
            <div className="flex justify-center items-center gap-2 md:mb-0 mb-4">
              <Link href="/Asso" className="text-[--primary] font-bold">
                Je suis une association
              </Link>
            </div>
          </form>
          <p className="text-red-500">
            {" "}
            {formErrors.global
              ? "Une erreur est survenue lors de l'inscription."
              : null}{" "}
          </p>
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
    </>
  );
}
