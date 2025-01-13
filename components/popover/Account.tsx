import { useState } from "react";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { usePlayer, type UsePlayer } from "@/components/model/player";

import ConfirmDelete from "@/components/popover/ConfirmDelete";

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Account({ handleClickActive, player }: MenuProps) {
  const { data: session, status } = useSession();
  const [isModifiable, setIsModifiable] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);

  // Gestion des états pour les champs du formulaire
  const [formValues, setFormValues] = useState({
    nom: player.getNom(),
    prenom: player.getPrenom(),
    pseudo: player.getPseudo(),
    mail: player.getMail(),
  });

  const [originalValues, setOriginalValues] = useState({ ...formValues });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async () => {
    if (isModifiable) {
      // Enregistrer les modifications dans l'objet `player`
      player.setNom(formValues.nom);
      player.setPrenom(formValues.prenom);
      player.setPseudo(formValues.pseudo);

      if (!player.getIsOAuth()) {
        player.setMail(formValues.mail);
      }
    } else {
      // Sauvegarder les valeurs actuelles avant modification
      setOriginalValues({ ...formValues });
    }
    setIsModifiable((prev) => !prev); // Alterne entre modification et validation
  };

  const handleCancel = () => {
    // Rétablir les valeurs d'origine
    setFormValues({ ...originalValues });
    setIsModifiable(false);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    redirect("/");
  };

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  const useP = usePlayer(player.getMail());
  console.log(useP.getPhareended());
  console.log(useP.getPhareended().length);

  return (
    <main className="absolute top-0 z-40 flex w-full h-full">
      <section className="flex flex-col self-center gap-7 mb-5 md:mb-0 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        {isDeleteConfirmVisible && (
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-80 z-10"></div>
        )}

        <button
          className={`absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90 ${
            isModifiable ? "opacity-20" : ""
          }`}
          onClick={() => handleClickActive("home")}
        >
          <Image
            src="/icones/xmark-solid.svg"
            alt="Close"
            width={24}
            height={24}
          />
        </button>

        <div className="flex justify-center items-center gap-2 md:gap-32">
          <Image
            src={session?.user?.image ?? "/images/profile.png"}
            alt="Profile picture"
            width={200}
            height={200}
            className="rounded-full hidden md:block"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-extrabold text-5xl">
              {formValues.nom} {formValues.prenom}
            </h1>
            <h2 className="text-lg">{formValues.mail}</h2>
            <div className="flex justify-start items-center gap-7">
              <div className="flex justify-center mx-auto md:mx-0 items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer duration-300 hover:ring-1 ring-[--primary]">
                <Image
                  src="/images/lighthouse.png"
                  alt="Lighthouse"
                  width={25}
                  height={25}
                />
                <span>
                  {useP.getPhareended().length} / 5{}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              onClick={handleSignOut}
              className={`fill-[--text] size-7 md:size-12 ${
                isModifiable
                  ? "opacity-20 cursor-default"
                  : "opacity-100 cursor-pointer"
              }`}
            >
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            <h1
              className={`hidden md:block ${isModifiable ? "opacity-20" : ""}`}
            >
              Déconnexion
            </h1>
          </div>
        </div>

        <hr className="w-[60vw] border-[--text] self-center" />
        <form className="flex flex-col items-center justify-center gap-7 pl-7 mx-auto md:px-7 w-full">
          <div className="flex flex-col md:flex-row gap-7 md:gap-12">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Nom</h3>
              <input
                type="text"
                name="nom"
                value={formValues.nom}
                onChange={handleInputChange}
                disabled={!isModifiable}
                className={`py-2 px-4 md:w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                  isModifiable ? "ring-2 text-slate-900 ring-blue-500" : ""
                }`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Prénom</h3>
              <input
                type="text"
                name="prenom"
                value={formValues.prenom}
                onChange={handleInputChange}
                disabled={!isModifiable}
                className={`py-2 px-4 md:w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                  isModifiable ? "ring-2 text-slate-900 ring-blue-500" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">Pseudo</h3>
            <input
              type="text"
              name="pseudo"
              value={formValues.pseudo}
              onChange={handleInputChange}
              disabled={!isModifiable}
              className={`py-2 px-4 md:w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                isModifiable ? "ring-2 text-slate-900 ring-blue-500" : ""
              }`}
            />
          </div>
          {!player.getIsOAuth() && (
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Email</h3>
              <input
                type="email"
                name="mail"
                value={formValues.mail}
                onChange={handleInputChange}
                disabled={!isModifiable}
                className={`py-2 px-4 md:w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45 ${
                  isModifiable ? "ring-2 text-slate-900 ring-blue-500" : ""
                }`}
              />
            </div>
          )}
        </form>
        <div className="flex flex-col gap-6 mt-7">
          {/* Annuler / Modifier */}
          <div className="flex justify-center gap-4">
            {isModifiable && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-[20vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl italic py-2 px-4 rounded-2xl"
              >
                Annuler
              </button>
            )}
            <button
              type="button"
              onClick={handleToggleEdit}
              className="md:w-[20vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-4 rounded-2xl"
            >
              {isModifiable ? "Valider" : "Modifier"}
            </button>
          </div>

          {/* Supprimer */}
          <div className="flex justify-center">
            <button
              onClick={() => setIsDeleteConfirmVisible(true)}
              className={`md:w-[20vw] hover:bg-red-600 hover:text-[--background] border-2 border-red-600 duration-300 cursor-pointer text-xl italic py-2 px-4 rounded-2xl ${
                isModifiable ? "opacity-20 pointer-events-none" : ""
              }`}
            >
              Supprimer le compte
            </button>
            {isDeleteConfirmVisible && (
              <ConfirmDelete
                handleClickActive={() => setIsDeleteConfirmVisible(false)}
                player={player}
              />
            )}
          </div>

          {/* À propos / CGU */}
          <div className="flex justify-center gap-4 md:gap-10 pt-7 md:pt-20">
            <button
              className={`md:w-[30vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer md:text-lg font-bold py-2 px-4 rounded-2xl ${
                isModifiable ? "opacity-20 pointer-events-none" : ""
              }`}
              onClick={() => handleClickActive("about")}
            >
              À propos
            </button>
            <button
              className={`md:w-[30vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer md:text-lg font-bold py-2 px-4 rounded-2xl ${
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
