import React from "react";
import Image from "next/image";

interface TipsProps {
  handleClickTips: (a: string) => void;
  title: string;
  text: string;
  cx: string;
  cy: string;
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
        left: `${cx}`,
        top: `${cy}`,
        transform: "translate(-50%, -50%)",
        backgroundImage: "url(/icones/bois.webp)",
        backgroundColor: "rgba(255, 228, 204, 0.9)",
        ...(window.innerWidth < 768 && {
          left: "50%",
          top: "50%",
          width: "90%",
          height: "90%",
        }),
        borderTop: "22px solid transparent",
        borderBottom: "22px solid transparent",
        borderImage: "url(/icones/rope.webp) 22 round",
      }}
      className={`bg-opacity-50 rounded-3xl backdrop-blur-md px-7 py-7 scrollbarhidden`}
    >
      <button
        className={
          "absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
        }
        onClick={() => {
          handleClickTips("0");
        }}
      >
        <Image
          src={"/icones/xmark-solid.svg"}
          alt="arrow-back"
          width={15}
          height={15}
        />
      </button>
      <div>
        <h1 className="font-bold">{title}</h1>
        <div
          className="my-2"
          style={{
            width: "100%",
            height: "100%",
            borderBottom: "1px solid grey",
          }}
        ></div>
      </div>
      <div className="flex flex-row items-center justify-between h-full">
      <span
            dangerouslySetInnerHTML={{ __html: text }}
        ></span>
        <Image
          className="ml-[10px]"
          src={img}
          alt="mascotte"
          width={100}
          height={100}
        />
      </div>
      <button
        className={
          next === "0"
            ? "hidden"
            : "absolute bottom-1 right-5 transform transition-all hover:right-4 hover:pl-[1vw]"
        }
        onClick={() => {
          handleClickTips(next);
        }}
      >
        <div className="flex flex-row justify-center items-center gap-1">
          <p className="mb-1 font-bold">Astuce suivante </p>
          <Image
            src={"/icones/arrow-right-solid.svg"}
            alt="arrow-back"
            width={15}
            height={15}
          />
        </div>
      </button>
    </section>
  );
}
