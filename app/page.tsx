"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CGU from "@/components/popover/CGU-Acceuil"; // Ensure this component exists and handles the display of CGU

export default function LandingPage() {
  const [isCGUOpen, setIsCGUOpen] = useState(false);

  const handleClickActive = (action: string) => {
    if (action === "close") {
      setIsCGUOpen(false); // Ferme le modal si l'action est "close"
    }
  };

  const handleOpenCGU = () => {
    setIsCGUOpen(true); // Ouvre le modal
  };
  return (
    <>
      <main className=" flex flex-col justify-start text-[--background] py-7 px-7 w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden land">
        <Link href="/Login" className=" self-end">
          <button className=" w-44 py-2 px-4 text-xl font-bold rounded-3xl hover:bg-[--primary] border-b-2 border-[--primary] duration-300 ease-in-out">
            Se connecter
          </button>
        </Link>
        <div className=" flex flex-col justify-center items-center w-fit h-fit">
          <h1 className="text-8xl font-ouroboros ml-12 mt-8 self-start text-[--accent]">
            Phare <br /> <span className=" ml-8">Away</span>
          </h1>
          <p className=" max-w-[30vw] text-center text-xl font-semibold mt-5">
            Découvrez <b> PhareAway </b>: une aventure captivante à travers de
            petits escape games qui vous plongent dans l’univers fascinant des
            phares ! Explorez leurs mystères, relevez des défis et laissez-vous
            émerveiller par ces gardiens de lumière. 🌟
          </p>
          <Link href="/Rgpd" className="mt-5">
            <button className=" w-fit py-2 px-4 text-xl font-bold rounded-3xl border-b-2 hover:bg-[--primary] border-[--primary] duration-300 ease-in-out">
              Rejoignez l’aventure dès maintenant !
            </button>
          </Link>
        </div>
      </main>
      {/* Footer */}
      <Image
        src="/images/soupex.png"
        alt="Logo SoupexSoftware"
        width={100}
        height={100}
        className="absolute bottom-0 left-0"
      ></Image>
      <footer className=" absolute bottom-0 w-[100vw] h-fit flex justify-center items-center bg-transparent text-white py-4">
        <p className="text-xs">
          © 2025 PhareAway - Tous droits réservés | Créé avec ❤️ par
          l&apos;équipe SoupexSoftware
        </p>
        <button
          className="flex gap-2 items-center absolute right-6"
          onClick={handleOpenCGU}
        >
          <h1 className="text-xs">Nos conditions d&apos;utilisation</h1>
          <Image src="/icones/info.svg" alt="info" width={20} height={20} />
        </button>
      </footer>
      {isCGUOpen && <CGU handleClickActive={handleClickActive} />}
    </>
  );
}
