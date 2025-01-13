import { useState } from "react";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent } from "react";
import type { UsePlayer } from "@/components/model/player";

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Account({ handleClickActive, player }: MenuProps) {
  const { data: session, status } = useSession();
  const [isModifiable, setIsModifiable] = useState(false);

  const [originalValues, setOriginalValues] = useState({
    nom: player.getNom(),
    prenom: player.getPrenom(),
    pseudo: player.getPseudo(),
    mail: player.getMail(),
  });

  const handleIsModif = async () => {
    if (isModifiable) {
      setOriginalValues({
        nom: player.getNom(),
        prenom: player.getPrenom(),
        pseudo: player.getPseudo(),
        mail: player.getMail(),
      });
      const nomInput = (
        document.querySelector('input[name="nom"]') as HTMLInputElement
      ).value;
      const prenomInput = (
        document.querySelector('input[name="prenom"]') as HTMLInputElement
      ).value;
      const pseudoInput = (
        document.querySelector('input[name="pseudo"]') as HTMLInputElement
      ).value;
      const mailInput = (
        document.querySelector('input[name="mail"]') as HTMLInputElement
      ).value;
      /* const passwordInput = (
        document.querySelector('input[name="password"]') as HTMLInputElement
      ).value; */
      player.setNom(nomInput);
      player.setPrenom(prenomInput);
      player.setPseudo(pseudoInput);
      if (player.getIsOAuth() === false) {
        player.setMail(mailInput);
        // player.setPassword(passwordInput);
      }
    }

    setIsModifiable((prev) => !prev); // Alterner entre modification et validation
  };

  const handleCancel = () => {
    player.setNom(originalValues.nom);
    player.setPrenom(originalValues.prenom);
    player.setPseudo(originalValues.pseudo);
    if (player.getIsOAuth() === false) {
      player.setMail(originalValues.mail);
    }

    (document.querySelector('input[name="nom"]') as HTMLInputElement).value =
      originalValues.nom;
    (document.querySelector('input[name="prenom"]') as HTMLInputElement).value =
      originalValues.prenom;
    (document.querySelector('input[name="pseudo"]') as HTMLInputElement).value =
      originalValues.pseudo;
    (document.querySelector('input[name="mail"]') as HTMLInputElement).value =
      originalValues.mail;

    setIsModifiable(false); // Désactiver le mode modifiable
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    redirect("/");
  };

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col self-center gap-7 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className={`absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90 ${
            isModifiable ? "opacity-20" : ""
          }`}
          onClick={() => handleClickActive("home")}
        >
          <Image
            src="/icones/xmark-solid.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>

        <div className="flex justify-center items-center gap-32">
          <Image
            src={session?.user?.image ?? "/images/profile.png"}
            alt="Profile picture"
            width={200}
            height={200}
            className="rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-5xl">
              {nom} {prenom}
            </h1>
            <h2 className="text-lg">{mail}</h2>
            <div className="flex justify-start items-center gap-7">
              <div className="flex justify-center items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer duration-300 hover:ring-1 ring-[--primary]">
                <Image
                  src="/images/lighthouse.png"
                  alt="Lighthouse"
                  width={25}
                  height={25}
                />
                <span>{player.getNbPhareFinished()} / 5</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={handleSignOut}
              className={`fill-[--text] size-12 ${
                isModifiable
                  ? "opacity-20 cursor-default"
                  : "opacity-100 cursor-pointer"
              }`}
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            <h1 className={` ${isModifiable ? "opacity-20" : ""}`}>
              déconnexion
            </h1>
          </div>
        </div>
        <hr className="w-[60vw] border-[--text] self-center" />
        <form
          onSubmit={handleIsModif}
          className="flex flex-col gap-7 pl-7 mx-auto px-7 w-full justify-center items-center"
        >
          <div className="flex gap-12 justify-start">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Nom</h3>
              <input
                type="text"
                name="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className={`py-2 px-4 w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                  isModifiable ? "ring-2 text-slate-900 ring-blue-500" : ""
                }`}
                disabled={!isModifiable}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Prénom</h3>
              <input
                name="prenom"
                type="text"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className={`py-2 px-4 w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                  isModifiable ? "text-slate-900 ring-2 ring-blue-500" : ""
                }`}
                disabled={!isModifiable}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">Nom d&apos;utilisateur</h3>
            <input
              name="pseudo"
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              className={`py-2 px-4 w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                isModifiable ? "ring-2 text-slate-900 ring-blue-500" : ""
              }`}
              disabled={!isModifiable}
            />
          </div>
          <div
            className={` ${
              player.getIsOAuth() === true ? "hidden" : "flex flex-col"
            } gap-1`}
          >
            <h3 className="font-bold text-xl">Email</h3>
            <input
              name="mail"
              type="mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              className={`py-2 px-4 w-[33vw] rounded-full bg-white bg-opacity-45 ${
                isModifiable ? "ring-2 ring-blue-500" : ""
              }`}
              disabled={!isModifiable}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-3 pt-3">
            <div className="flex gap-5">
              <button
                onClick={handleCancel}
                className={`w-[20vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold mx-auto py-2 px-2 rounded-2xl ${
                  isModifiable ? "" : "hidden"
                }`}
              >
                Annuler
              </button>

              <button
                onClick={handleIsModif}
                className="w-[20vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold mx-auto py-2 px-2 rounded-2xl"
              >
                {isModifiable ? "Valider" : "Modifier"}
              </button>
            </div>
            <button
              onClick={player.deletePlayer}
              className={`w-[20vw] hover:bg-red-600 hover:text-[--background] border-2 border-red-600 duration-300 cursor-pointer text-xl italic mx-auto py-2 px-2 rounded-2xl ${
                isModifiable ? "opacity-20 pointer-events-none" : ""
              }`}
            >
              Supprimer le compte
            </button>
          </div>
          <div className="flex flex-row gap-10 absolute bottom-10">
            <button
              className={`w-[28vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl ${
                isModifiable ? "opacity-20 pointer-events-none" : ""
              }`}
              onClick={() => handleClickActive("about")}
            >
              À propos
            </button>
            <button
              className={`w-[28vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl ${
                isModifiable ? "opacity-20 pointer-events-none" : ""
              }`}
              onClick={() => handleClickActive("cgu")}
            >
              Voir nos Conditions générales d’utilisation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
