import React from "react";
import Image from "next/image";

interface TipsProps {
  handleClickTips: (a: string) => void;
  title: string;
  text: string;
  cx: number;
  cy: number;
  img: string;
  next: string;
}

export default function Tips({
  handleClickTips,
  title,
  text,
  cx,
  cy,
  img,
  next,
}: TipsProps) {
  return (
    <section
      style={{
        position: "absolute",
        maxWidth: "600px",
        left: `${cx}vw`,
        top: `${cy}vw`,
      }}
      className={` bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-7 py-7 scrollbarhidden`}
    >
      <button
        className={
          next === "0"
            ? "absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
            : "absolute top-5 right-5 transform transition-all hover:right-4 hover:pl-[1vw]"
        }
        onClick={() => {
          handleClickTips(next);
        }}
      >
        <Image
          src={
            next === "0"
              ? "/icones/xmark-solid.svg"
              : "/icones/arrow-right-solid.svg"
          }
          alt="arrow-back"
          width={15}
          height={15}
        />
      </button>
      <div>
        <h1 className="font-decoration-underline">{title}</h1>
        <div
          className=""
          style={{
            width: "100%",
            borderBottom: "1px solid lightgrey",
          }}
        ></div>
      </div>
      <div className="flex flex-row items-center justify-between h-full">
        <span>{text}</span>
        <Image
          className="ml-[10px]"
          src={img}
          alt="mascotte"
          width={100}
          height={100}
        />
      </div>
    </section>
  );
}
