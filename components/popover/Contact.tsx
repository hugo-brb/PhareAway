import Image from "next/image";
import type { UsePlayer } from "@/components/model/player";
import { useState, FormEvent } from "react";

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Contact({ handleClickActive, player }: MenuProps) {
  const [formData, setFormData] = useState({
    nom: player.getNom(),
    prenom: player.getPrenom(),
    pseudo: player.getPseudo(),
    email: player.getMail(),
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifier que le champ email est valide
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      window.alert("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    try {
      const response = await fetch("/api/mailAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Message envoyé !");
        setFormData({
          nom: "",
          prenom: "",
          pseudo: "",
          email: "",
          message: "",
        });
        window.alert("Votre message a été envoyé avec succès !");
      } else {
        console.error("Erreur lors de l'envoi.");
        window.alert("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      window.alert("Une erreur est survenue lors de l'envoi du message.");
    }
  };

  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col self-center gap-7 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className={`absolute top-5 left-5 transform transition-all hover:left-4`}
          onClick={() => handleClickActive("about")}
        >
          <Image
            src="/icones/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>
        <button
          className="absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
          onClick={() => handleClickActive("home")}
        >
          <Image
            src="/icones/xmark-solid.svg"
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="flex gap-12">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-xl text-slate-600">Nom</h3>
                <input
                  type="text"
                  name="nom"
                  value={player.getNom()}
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
                  className={`py-2 px-4 w-[15vw] text-slate-400 rounded-full bg-white bg-opacity-45 `}
                  disabled
                />
              </div>
            </div>
            <div
              className={` ${
                player.getPseudo() === "" ? "hidden" : "flex flex-col gap-1"
              }`}
            >
              <h3 className="font-bold text-xl text-slate-600">
                Nom d&apos;utilisateur
              </h3>
              <input
                name="pseudo"
                type="text"
                value={player.getPseudo()}
                className={`py-2 px-4 w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45`}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl text-slate-600">
                Adresse email
              </h3>
              <input
                name="email"
                type="email"
                value={player.getMail()}
                className={`py-2 px-4 w-[33vw] text-slate-400 rounded-full bg-white bg-opacity-45`}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xl">Message</h3>
              <textarea
                placeholder="Écrivez votre message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`py-3 pb-24 px-4 w-[33vw] rounded-3xl bg-white bg-opacity-45 ring-2 ring-slate-400`}
              />
            </div>

            <button
              type="submit"
              className={`${
                formData.message
                  ? "bg-[--primary] text-[--background] hover:bg-opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } border-2 duration-300 cursor-pointer text-xl font-bold mx-auto py-2 px-6 rounded-2xl`}
            >
              Valider
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
