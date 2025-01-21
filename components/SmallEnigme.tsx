import React from "react";
import Image from "next/image";
import { useState } from "react";
import { UsePlayer } from "@/model/Player";

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
  onResolve: (index: number) => void; // Ajout d'un callback pour signaler une résolution
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
  onResolve,
}: SmallEnigmeProps) {
  const [popupA, setPopupA] = useState("null");
  const handleClickAnswer = (a: string) => {
    setPopupA(a);
  };

  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/gi, "");
  };

  return (
    <section
      className={`${
        popupA === "Vrai" || popupA === "EndNot" || popupA === "EndFirst"
          ? "bg-green-500"
          : popupA === "Faux"
          ? "bg-red-500"
          : "bg-white"
      } absolute left-4 top-4 md:left-[44vw] md:top-[20vw] mt-12 z-50 h-fit w-[90%] max-h-[90%] md:w-[20vw] md:max-h-[18vw] bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-7 overflow-y-scroll scrollbarhidden`}
    >
      <div
        className={`flex flex-col items-center ${
          popupA === "Vrai" || popupA === "EndFirst" || popupA === "EndNot"
            ? "justify-center gap-4"
            : "justify-between"
        } h-full gap-4`}
      >
        <div className="flex flex-row justify-between w-full">
          <h1
            className={` ${
              popupA === "EndFirst" || popupA === "EndNot" ? "hidden" : ""
            } font-decoration-underline`}
          >
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
            onClick={() => handleClickPopup("0")}
          >
            <Image
              src="/icones/xmark-solid.svg"
              alt="close"
              width={15}
              height={15}
            />
          </button>
        </div>
        <div
          className={`${
            popupA === "EndFirst" || popupA === "EndNot" ? "hidden" : ""
          }`}
          style={{
            width: "100%",
            borderBottom: "1px solid lightgrey",
          }}
        ></div>
        {popupA === "Vrai" ? (
          <p>
            Bravo, bonne réponse <br /> Le code du cadenas à la position {id}{" "}
            est : {codeLock}
          </p>
        ) : popupA === "EndFirst" ? (
          <p>Bravo ! 50 Beacoins ont étaient ajouté à votre compte.</p>
        ) : popupA === "EndNot" ? (
          <p>Bravo ! Mais vous aviez déjà fini ce phare...</p>
        ) : (
          <>
            <span>{question}</span>
            <div className="flex flex-row">
              <p>
                {text1}
                <input
                  className={`${popupA === "Faux" ? "bg-red-500" : ""} mx-1`}
                  type="text"
                  placeholder="______"
                  style={{ minWidth: "32px", width: "32px", height: "32px" }}
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
                      button?.click();
                    }
                  }}
                />
                {text2}
              </p>
            </div>
            {popupA === "Faux" && (
              <p className="text-red-700 text-center py-1">
                Désolé, mais c&apos;est une mauvaise réponse...
              </p>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                const input = document.querySelector(
                  "input"
                ) as HTMLInputElement;
                if (lh === 104 && id === "3") {
                  const currentHour = new Date().getHours();
                  if (
                    (currentHour >= 18 && currentHour <= 23) ||
                    (currentHour >= 0 && currentHour < 6)
                  ) {
                    handleClickAnswer("Vrai");
                  } else {
                    handleClickAnswer("Faux");
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
                } else if (
                  normalizeString(input.value) === normalizeString(answer)
                ) {
                  if (id === "5") {
                    const phareEnded = player.getPhareended();
                    onResolve(parseInt(id) - 1);
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
                    onResolve(parseInt(id) - 1); // Appeler la fonction pour marquer l'énigme comme résolue
                  }
                } else {
                  handleClickAnswer("Faux");
                }
              }}
            >
              Valider
            </button>
          </>
        )}
      </div>
    </section>
  );
}
