import React from "react";
import Image from "next/image";
import { text } from "stream/consumers";

interface AnswerPopProps {
  handleClickAnswer: (a: string) => void;
  name: string;
  sol: boolean;
  text3: string;
}

export default function AnswerPop({
  handleClickAnswer,
  name,
  sol,
  text3,
}: AnswerPopProps) {
  return (
    <section
      style={{ left: `44vw`, top: `20vw`, marginBottom: `2vw` }}
      className={`bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-7 overflow-y-scroll scrollbarhidden ${
        sol ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-decoration-underline">{name}</h1>
          <button
            className="transform transition-transform duration-300 hover:rotate-90"
            onClick={() => {
              handleClickAnswer("0");
              console.log(sol);
            }} //fonction permettant de fermer la fenetre et revenir à l'état de base de l'élément parent
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
        <span>{text3}</span>
      </div>
    </section>
  );
}
