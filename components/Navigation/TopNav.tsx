import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { UsePlayer } from "@/model/Player";

// Music by https://www.bensound.com
// License code: A9CWKP9RGP0AHRBA

interface MenuProps {
  active: string;
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function TopNav({
  active,
  handleClickActive,
  player,
}: MenuProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Lorsque la musique est jouée, répéter la lecture
    if (audioRef.current) {
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <>
      <div className=" flex justify-center items-center gap-4 absolute top-4 right-4 bg-transparent z-40">
        {/*Légende */}
        {active === "home" && (
          <div className=" hidden md:flex justify-center items-center w-[16vw] gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md py-2">
            <div className=" flex items-center w-full">
              <Image
                src="/icones/lightHouseIconEnigme.svg"
                alt="Icone de phare"
                width={25}
                height={25}
              />
              <p className=" text-sm">Jouable</p>
            </div>
            <div className=" flex items-center w-full">
              <Image
                src="/icones/lightHouseIcon.svg"
                alt="Icone de phare"
                width={25}
                height={25}
              />
              <p className=" text-sm w-fit pr-2">Non jouable</p>
            </div>
          </div>
        )}

        {/*Audio Player */}
        <div
          onClick={togglePlay}
          className="flex items-center gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md px-4 py-[10.4px] cursor-pointer hover:drop-shadow-2xl duration-300"
        >
          <button className=" w-full h-full">
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className="size-5"
              >
                <path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className=" size-5"
              >
                <path d="M301.1 34.8C312.6 40 320 51.4 320 64l0 384c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352 64 352c-35.3 0-64-28.7-64-64l0-64c0-35.3 28.7-64 64-64l67.8 0L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z" />
              </svg>
            )}
          </button>
          <audio ref={audioRef} src="/audio/music.mp3" autoPlay />
        </div>

        {/*Affichage du portfeuille */}
        <div
          onClick={() => handleClickActive("coin")}
          className="flex items-center gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md px-4 py-2 cursor-pointer hover:drop-shadow-2xl duration-300"
        >
          <Image
            src="/images/BeaCoin.webp"
            width={25}
            height={25}
            alt="Beacoin"
            className=" hidden md:block"
          />
          <Image
            src="/images/BeaCoin.webp"
            width={20}
            height={20}
            alt="Beacoin"
            className=" md:hidden"
          />
          <p className=" text-sm md:text-base">{player.getBeacoins()}</p>
        </div>
      </div>
    </>
  );
}
