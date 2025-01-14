import React from "react";
import Image from "next/image";
import { useState } from "react";
import AnswerPop from "@/components/popover/Answer";
import { usePlayer } from "../model/player";

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
}: SmallEnigmeProps) {
  const [popupA, setPopupA] = useState("0");
  const handleClickAnswer = (a: string) => {
    setPopupA(a);
  };

  return (
    <section
      style={{ left: `44vw`, top: `20vw` }}
      className={`absolute w-[20vw] h-[15vw] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-7 overflow-y-scroll scrollbarhidden`}
    >
      {popupA === "Vrai" && (
        <AnswerPop
          handleClickAnswer={handleClickAnswer}
          name={name}
          sol={true}
          text3={`Le chiffre à la position ${id} est : ${codeLock} \n(Ancêtres fiers)`}
        />
      )}
      {popupA === "Faux" && (
        <AnswerPop
          handleClickAnswer={handleClickAnswer}
          name={name}
          sol={false}
          text3="Dommage Bozo ! Pas de code pour toi mon grand gourmand..."
        />
      )}
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-decoration-underline">{name}</h1>
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
          />
          <span>{text2}</span>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            const input = document.querySelector("input") as HTMLInputElement;
            if (input.value === answer) {
              if (id === "5") {
                const phareEnded: number[] = player.getPhareended();
                if (!phareEnded.includes(lh)) {
                  phareEnded.push(lh);
                  player.setPhareended(phareEnded);
                }
              }
              handleClickAnswer("Vrai");
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
