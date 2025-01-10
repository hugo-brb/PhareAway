import React from "react";
import { text } from "stream/consumers";
import React from "react";
import Image from "next/image";

interface SmallEnigmeProps {
  handleClickPopup: (a: string) => void;
  codeLock: number;
  coordX: number;
  coordY: number;
  name: string;
  question: string;
  text1: string;
  answer: string;
  text2: string;
}

export default function SmallEnigme({
  handleClickPopup,
  codeLock,
  coordX,
  coordY,
  name,
  question,
  text1,
  answer,
  text2,
}: SmallEnigmeProps) {
  return (
    <section
      style={{ left: `${coordX}vw`, top: `${coordY - 2}vw` }}
      className={`absolute w-[20vw] h-[10vw] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-12 overflow-y-scroll scrollbarhidden`}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          <h1>{name}</h1>
          <button
            className="absolute top-5 left-5 transform transition-transform duration-300 hover:-rotate-90"
            onClick={() => handleClickPopup("0")} //fonction permettant de fermer la fenetre et revenir à l'état de base de l'élément parent
          >
            <img
              src="/icones/xmark-solid.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>
        </div>
        <span>{question}</span>
        <div className="flex flex-row">
          <span>{text1}</span>
          <input
            className="flex items-center"
            type="text"
            placeholder="entrez la réponse ici"
          />
          <span>{text2}</span>
        </div>
      </div>
    </section>
  );
}

export default function SmallEnigme({
  handleClickPopup,
  codeLock,
  coordX,
  coordY,
  name,
  question,
  text1,
  answer,
  text2,
}: SmallEnigmeProps) {
  return (
    <section
      style={{ left: `${coordX}vw`, top: `${coordY - 2}vw` }}
      className={`absolute w-[20vw] h-[10vw] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-12 overflow-y-scroll scrollbarhidden`}
    >
      <button
        className="absolute top-5 left-5 transform transition-transform duration-300 hover:-rotate-90"
        onClick={() => handleClickPopup("0")} //fonction permettant de fermer la fenetre et revenir à l'état de base de l'élément parent
      >
        <Image
          src="/icones/xmark-solid.svg"
          alt="arrow-back"
          width={24}
          height={24}
        />
      </button>
      <div className="flex flex-col items-center">
        <h1>{name}</h1>
        <span>{question}</span>
        <span>{text1}</span>
        <input
          className="flex items-center"
          type="text"
          placeholder="entrez la réponse ici"
        />
        <span>{text2}</span>
      </div>
    </section>
  );
}
