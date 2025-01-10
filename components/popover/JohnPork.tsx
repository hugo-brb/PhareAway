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
      style={{ left: `44vw`, top: `23vw` }}
      className={`absolute w-[20vw] h-[10vw] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-7 overflow-y-scroll scrollbarhidden`}
    >
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
      </div>
    </section>
  );
}
