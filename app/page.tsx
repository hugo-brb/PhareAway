"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CGU from "@/components/popover/CGU-Acceuil"; // Ensure this component exists and handles the display of CGU
import InfiniteCarousel from "@/components/Carousel";

export default function LandingPage() {
  const [isCGUOpen, setIsCGUOpen] = useState(false);
  const [carouselOpened, setCarouselOpened] = useState(false);
  const itemsCarousel = [
    "https://nereoll.github.io/imagesPhare/carousel/metropoleExemple.png",
    "https://nereoll.github.io/imagesPhare/carousel/enigmeExemple.png",
    "https://nereoll.github.io/imagesPhare/carousel/eventExemple.png",
    "https://nereoll.github.io/imagesPhare/carousel/extensionExemple.png",
  ];
  const handleClickActive = (action: string) => {
    if (action === "close") {
      setIsCGUOpen(false); // Ferme le modal si l'action est "close"
    }
  };

  const handleOpenCGU = () => {
    setIsCGUOpen(true); // Ouvre le modal
  };

  const handleOpenCarousel = () => {
    setCarouselOpened(!carouselOpened);
  };

  return (
    <>
      <main className="flex flex-col justify-start text-[--background] md:py-7 px-2 md:px-7 w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden land">
        <div className=" self-center md:self-end flex gap-4">
          <Link href="/Login" className=" self-end">
            <button className=" w-36 md:w-44 py-2 px-4 text-lg md:text-xl font-bold rounded-3xl hover:bg-[--primary] border-b-2 border-[--primary] duration-300 ease-in-out">
              Se connecter
            </button>
          </Link>
          <Link href="/Rgpd" className="mt-5">
            <button className=" w-36 md:w-44 py-2 px-4 text-lg md:text-xl font-bold rounded-3xl border-b-2 hover:bg-[--primary] border-[--primary] duration-300 ease-in-out">
              S&apos;inscrire
            </button>
          </Link>
        </div>
        <div
          className={` ${
            carouselOpened
              ? "overflow-x-hidden hidden md:flex justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-[100] w-full h-full bg-white bg-opacity-75"
              : "hidden"
          } `}
        >
          <button className="absolute top-[3vh] left-[2vw] transform transition-transform duration-300 hover:rotate-90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className=" size-12"
              onClick={handleOpenCarousel}
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          <InfiniteCarousel items={itemsCarousel} speed={10} />
        </div>
        <div className=" flex flex-col justify-center items-center w-[100vw] h-[70vh] md:w-fit md:h-fit">
          <h1 className=" text-7xl md:text-8xl font-ouroboros md:ml-12 mt-8 self-start text-[--accent]">
            Phare <br /> <span className=" ml-8">Away</span>
          </h1>
          <p className="max-w-[95vw] md:max-w-[30vw] md:text-center text-xl font-semibold mt-5">
            Découvre <strong className="text-[--primary]">PhareAway</strong>
            🌊🔦: une aventure captivante à travers de
            <strong> petits escape games</strong> qui te plongent dans l’univers
            fascinant des <strong>phares de France</strong> ! 🌟
            <br />
            <strong>Explore leurs mystères</strong>, et
            <strong> laisse-toi émerveiller</strong> par ces gardiens de lumière
            qui veillent sur les côtes. 🌊
            <br />
            <span className="text-lg text-[--primary]">
              Saura-tu percer tous leurs secrets ?
            </span>
            🕵️‍♂️
          </p>

          <Link href="/Rgpd" className="mt-5">
            <button className=" w-fit py-2 px-4 mr-4 md:mr-0 text-lg md:text-xl font-bold rounded-3xl border-b-2 hover:bg-[--primary] border-[--primary] duration-300 ease-in-out">
              Rejoins l’aventure dès maintenant !
            </button>
          </Link>
          <button
            className="w-fit mt-2 text-base md:mt-7 py-2 px-4 md:text-xl font-bold rounded-3xl bg-[--primary] hover:bg-transparent border-b-2 border-[--primary] duration-300 ease-in-out"
            onClick={handleOpenCarousel}
          >
            Découvre le jeu en images ✨
          </button>
        </div>
      </main>
      {/* Footer */}
      <Image
        src="/images/soupex.png"
        alt="Logo SoupexSoftware"
        width={100}
        height={100}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-0 md:left-0"
      ></Image>
      <footer className=" absolute bottom-0 w-[100vw] h-fit flex justify-center items-center bg-transparent text-white py-4">
        <p className=" text-[0.5rem] md:text-xs">
          © 2025 PhareAway - Tous droits réservés | Créé avec ❤️ par
          l&apos;équipe SoupexSoftware
        </p>
        <button
          className="flex gap-2 items-center absolute right-2 md:right-6"
          onClick={handleOpenCGU}
        >
          <h1 className="text-xs hidden md:block">
            Nos conditions d&apos;utilisation
          </h1>
          <Image src="/icones/info.svg" alt="info" width={20} height={20} />
        </button>
      </footer>
      {isCGUOpen && <CGU handleClickActive={handleClickActive} />}
    </>
  );
}
