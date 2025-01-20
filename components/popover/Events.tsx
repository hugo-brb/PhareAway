import { UsePlayer } from "../model/player";
import Image from "next/image";

import { useState } from "react";
import React from "react";
import SearchBar from "./SearchBar";
import Tips from "@/components/popover/Tips";

interface MenuProps {
  handleClickActive: (a: string) => void;
  handleClickTips: (a: string) => void;
  player: UsePlayer;
}

export default function Events({ handleClickActive, player }: MenuProps) {
  const [tips, setTips] = useState("0");
  const handleClickTips = (a: string) => {
    setTips(a);
  };
  return (
    <>
      <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center mb-5 md:mb-0 gap-12 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 left-5 flex flex-col items-center"
            onClick={() => handleClickTips("1")}
          >
            <Image
              src="/mascotte/help.png"
              alt="Aide"
              width={75}
              height={75}
            ></Image>
            <span className=" text-[0.7rem]">Besoin d&apos;aide ?</span>
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
          {player.getIsAsso() && (
            <button
              onClick={() => handleClickActive("addEvent")}
              className=" flex items-center gap-2 bg-[--primary] ring-2 ring-[--primary] rounded-2xl duration-500 hover:bg-transparent w-fit self-center py-2 px-3 text-lg font-bold"
            >
              <svg
                className=" size-5 fill-[--text]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>{" "}
              Ajouter un événement
            </button>
          )}

          <div>
            <SearchBar />
          </div>
        </section>
        {/*Affichage des astuces*/}
        {tips === "1" && (
          <Tips
            handleClickTips={handleClickTips}
            title="Bienvenue sur la page des événements"
            cx="35vw"
            cy="30vw"
            text={
              "C'est ici que les associations peuvent ajouter des événements. Tu peux en consulter les caractéristiques, comme le lieu, le prix, la date..."
            }
            img="/mascotte/temp.png"
            next="2"
          />
        )}
        {tips === "2" && (
          <Tips
            handleClickTips={handleClickTips}
            title="Recherche / Trie"
            cx="35vw"
            cy="10vw"
            text={
              "Tu peux trier et rechercher les événements par nom, par date et par prix en utilisant la barre de recherche et les boutons."
            }
            img="/mascotte/temp.png"
            next="0"
          />
        )}
      </main>
    </>
  );
}
