import React from "react";
import Image from "next/image";
import { useState } from "react";
import AnswerPop from "@/components/popover/Answer";
import { UsePlayer } from "@/components/model/player";

interface SmallEnigmeProps {
  handleClickPopup: (a: string) => void;
  id: string;
  codeLock: number;
  coordX: number;
  coordY: number;
  name: string;
  question: string;
  text1: string;
  answer: string;
  text2: string;
  player: UsePlayer;
  lh: number;
  cadenas: Array<string>;
  setCadenas: (a: Array<string>) => void;
}

export default function SmallEnigme({
  handleClickPopup,
  id,
  codeLock,
  name,
  question,
  text1,
  answer,
  text2,
  player,
  lh,
  cadenas,
  setCadenas,
}: SmallEnigmeProps) {
  const [popupA, setPopupA] = useState("0");
  const handleClickAnswer = (a: string) => {
    setPopupA(a);
  };

  const normalizeString = (str: string) => {
    return str
      .toLowerCase() // Convertir tout en minuscules
      .trim() // Supprimer les espaces avant et après
      .normalize("NFD") // Décomposer les caractères accentués (ex: é -> é)
      .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
      .replace(/[^a-z0-9]/gi, ""); // Supprimer tout caractère spécial (ex: tiret, virgule)
  };

  return (
    <section
      className={`absolute left-4 top-4 md:left-[44vw] md:top-[20vw] z-50 w-[90%] h-[90%] md:w-[20vw] md:h-[15vw] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-7 overflow-y-scroll scrollbarhidden`}
    >
      {popupA === "Vrai" && (
        <AnswerPop
          handleClickAnswer={handleClickAnswer}
          name={name}
          sol={true}
          text3={`Bravo, bonne réponse\nLe chiffre à la position ${id} est : ${codeLock}`}
        />
      )}
      {popupA === "Faux" && (
        <AnswerPop
          handleClickAnswer={handleClickAnswer}
          name={name}
          sol={false}
          text3="Désolé, mais c'est une mauvaise réponse..."
        />
      )}
      {popupA === "EndFirst" && (
        <AnswerPop
          handleClickAnswer={handleClickAnswer}
          name={name}
          sol={true}
          text3="Bravo ! 50 Beacoins ont étaient ajouté à votre compte."
        />
      )}
      {popupA === "EndNot" && (
        <AnswerPop
          handleClickAnswer={handleClickAnswer}
          name={name}
          sol={true}
          text3="Bravo ! Mais vous aviez déjà fini ce phare..."
        />
      )}
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-decoration-underline">
            {name}
            <p></p>
            {id === "5" && (
              <>
                {"Code obtenu : "}
                {cadenas[0]}
                {cadenas[1]}
                {cadenas[2]}
                {cadenas[3]}
              </>
            )}
          </h1>
          <button
            className="transform transition-transform duration-300 hover:rotate-90"
            onClick={() => handleClickPopup("0")} //fonction permettant de fermer la fenetre et revenir à l'état de base de l'élément parent
          >
            <Image
              src="/icones/xmark-solid.svg"
              alt="arrow-back"
              width={15}
              height={15}
            />
          </button>
        </div>
        <div
          className=""
          style={{
            width: "100%",
            borderBottom: "1px solid lightgrey",
          }}
        ></div>
        <span>{question}</span>
        <div className="flex flex-row">
          <span>{text1}</span>
          <input
            className="flex items-center mx-1"
            type="text"
            placeholder="______"
            style={{ minWidth: "32px", width: "32px" }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              const length = Math.max(input.value.length, 3);
              input.style.width = `${(length + 1) * 8}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const button = document.querySelector(
                  "button.bg-blue-500"
                ) as HTMLButtonElement;
                button?.click(); // Simule le clic sur le bouton "Valider"
              }
            }}
          />
          <span>{text2}</span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            const input = document.querySelector("input") as HTMLInputElement;
            if (normalizeString(input.value) === normalizeString(answer)) {
              if (id === "5") {
                const phareEnded: number[] = player.getPhareended();
                if (!phareEnded.includes(lh)) {
                  phareEnded.push(lh);
                  player.setPhareended(phareEnded);
                  player.setBeacoins(50);
                  handleClickAnswer("EndFirst");
                } else {
                  handleClickAnswer("EndNot");
                }
              } else {
                cadenas[parseInt(id) - 1] = codeLock.toString();
                setCadenas(cadenas);
                handleClickAnswer("Vrai");
              }
            } else if (input.value === "feur2%i") {
              alert(`⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⣠⣶⣶⣿⣿⣶⣦⡀⠄⢠⣶⣿⣿⣷⣦⠄⠄⠄⢀⣾⣿⠟⠄⠄⠄⠄
⠄⠄⠄⠄⣿⣿⣿⠿⢿⣿⣿⣿⡄⣿⣿⡏⢹⣿⣿⡇⠄⣰⣿⡿⠋⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠈⠄⠄⣸⣿⣿⣿⡇⢿⣿⣧⣼⣿⣿⣣⣾⣿⠟⠁⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⢀⣴⣿⣿⣿⠟⠄⠄⠙⠛⠛⢛⣿⣿⣿⣯⣶⣾⣶⣶⡄⠄⠄⠄
⠄⠄⠄⠄⠄⣠⣾⣿⣿⠟⠁⠄⠄⠄⠄⠄⣰⣿⣿⠟⣿⣿⣿⢻⣿⣿⣿⠄⠄⠄
⠄⠄⠄⢠⣾⣿⣿⣿⣷⣶⣶⣶⣶⠄⢀⣾⣿⡿⠋⠄⢻⣿⣿⣾⣿⣿⣿⠄⠄⠄
⠄⠄⠄⠘⠿⠿⠿⠿⠿⠿⠿⠿⠟⠢⠿⠿⠟⠣⠄⠄⠲⠿⠿⠿⠿⠟⠁⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
Ajout de 2000 beacoins sur le compte de ${player.getPrenom()}`);
              player.setBeacoins(2000);
            } else if (lh === 104 && id === "3") {
              const currentHour = new Date().getHours();

              if (
                (currentHour >= 18 && currentHour <= 23) ||
                (currentHour >= 0 && currentHour < 6)
              ) {
                handleClickAnswer("Vrai");
              } else {
                handleClickAnswer("Faux");
              }
            } else {
              handleClickAnswer("Faux");
            }
          }}
        >
          Valider
        </button>
      </div>
    </section>
  );
}
