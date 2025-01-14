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
      <main className="flex flex-col justify-between w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] overflow-hidden land">
        {/* Contenu principal */}
        <div className="flex flex-col justify-center items-center flex-grow relative">
          <div className=" bg-transparent absolute top-5 left-5 flex flex-col">
            <h1 className=" text-7xl font-ouroboros text-[--accent]">
              PhareAway
            </h1>
            <h2 className=" text-2xl text-bold text-[--background] max-w-[45vw]">
              PhareAway est une application ludique mettant en valeur les phares
              de France.
            </h2>
          </div>
          <div className=" absolute top-5 right-5 flex gap-3 text-[--background]">
            <Link href="/Login">
              <button className=" w-44 py-2 px-4 text-xl font-bold rounded-3xl hover:ring-2 ring-[--primary] duration-300 ease-in-out">
                Se connecter
              </button>
            </Link>
            <Link href="/Rgpd">
              <button className=" w-44 py-2 px-4 text-xl font-bold rounded-3xl hover:ring-2 ring-[--primary] duration-300 ease-in-out">
                S&apos;inscrire
              </button>
            </Link>
          </div>

          {/* Citation */}
          <div className=" cita-author w-fit h-fit bg-gray-500 bg-opacity-45 text-inherit absolute left-28 rounded-lg">
            <div className=" w-full uppercase font-gravitas text-3xl font-extrabold text-[--background] p-9 leading-8">
              Enigme du mois
            </div>
            <div className=" w-full text-[--accent] opacity-40 pl-8 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 330 307"
                height="80"
                width="80"
              >
                <path
                  fill="currentColor"
                  d="M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z"
                ></path>
              </svg>
            </div>
            <div className=" w-full text-xl font-black pt-16 px-10 text-[--background] absolute top-10 left-2 leading-6">
              Qui est considéré comme l&apos;inventeur du phare ?
            </div>
            <a
              href="https://heritage.ecoledesponts.fr/enpc/fr/content/grand-format-les-phares-et-balises-des-ponts#:~:text=L%27opticien%20François%20Soleil%20(1775,pour%20l%27éclairage%20des%20côtes."
              target="_blank"
              className=" w-full author mt-5 mb-2 opacity-0 duration-500 font-bold text-[--background] pl-7 flex gap-2"
            >
              L&apos;opticien François Soleil <br /> <span>(1775 – 1846)</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-center items-center bg-gray-800 text-white py-4">
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
      </main>
    </>
  );
}
