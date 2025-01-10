import Image from "next/image";
import type { UsePlayer } from "@/components/model/player";
import { useState } from "react";

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Contact({ handleClickActive, player }: MenuProps) {
  const [message, setMessage] = useState("");
  const [subject] = useState("Demande d'assistance");

  const generateMailtoLink = () => {
    const emailBody = `Nom: ${player.getNom()}\nPrénom: ${player.getPrenom()}\nUtilisateur: ${player.getPseudo()}\nMessage:\n${message}`;
    const mailtoLink = `mailto:hugobarbieri38@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(emailBody)}`;
    return mailtoLink;
  };

  const handleSubmit = () => {
    // Crée un lien mailto avec les informations de l'utilisateur
    const mailtoLink = generateMailtoLink();

    // Ouvre le lien mailto pour envoyer l'email
    window.location.href = mailtoLink;

    // Réinitialiser le message après l'envoi
    setMessage("");
  };

  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col self-center gap-7 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className={`absolute top-5 left-5 transform`}
          onClick={() => handleClickActive("about")}
        >
          <Image
            src="/icones/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>

        <div className="flex flex-col items-center gap-8 px-16">
          <h1 className="text-3xl font-extrabold">Nous contacter</h1>
          <h2 className="px-16">Un problème ? Un bug à signaler ?</h2>
          <h2 className="px-16">
            N’hésitez pas à nous contacter pour nous en informer et nous aider à
            améliorer votre expérience !
          </h2>

          <div className="flex gap-12">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl text-slate-600">Nom</h3>
              <input
                type="text"
                name="nom"
                value={player.getNom()}
                onChange={(e) => player.setNom(e.target.value)}
                className={`py-2 px-4 w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45`}
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl text-slate-600">Prénom</h3>
              <input
                name="prenom"
                type="text"
                value={player.getPrenom()}
                onChange={(e) => player.setPrenom(e.target.value)}
                className={`py-2 px-4 w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45 `}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl text-slate-600">
              Nom d&apos;utilisateur
            </h3>
            <input
              name="pseudo"
              type="text"
              value={player.getPseudo()}
              onChange={(e) => player.setPseudo(e.target.value)}
              className={`py-2 px-4 w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45`}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl text-slate-600">Adresse email</h3>
            <input
              name="pseudo"
              type="text"
              value={player.getMail()}
              onChange={(e) => player.setPseudo(e.target.value)}
              className={`py-2 px-4 w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45`}
              disabled
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-xl">Message</h3>
            <textarea
              placeholder="Écrivez votre message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`py-3 pb-24 px-4 w-[33vw] rounded-3xl bg-white bg-opacity-45 ring-2 ring-slate-400`}
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`${
              message
                ? "bg-[--primary] text-[--background] hover:bg-opacity-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } border-2 duration-300 cursor-pointer text-xl font-bold mx-auto py-2 px-6 rounded-2xl`}
            disabled={!message}
          >
            Valider
          </button>
        </div>
      </section>
    </main>
  );
}
