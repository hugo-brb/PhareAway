import Image from "next/image";
import type { UsePlayer } from "@/components/model/player";

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Coin({ handleClickActive, player }: MenuProps) {
  return (
    <>
      <div
        onClick={() => handleClickActive("coin")}
        className="flex items-center gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md px-4 py-2 absolute top-3 right-3 z-50 cursor-pointer hover:drop-shadow-2xl duration-300"
      >
        <Image
          src="/images/BeaCoin.png"
          width={25}
          height={25}
          alt="Beacoin"
          className=" hidden md:block"
        />
        <Image
          src="/images/BeaCoin.png"
          width={20}
          height={20}
          alt="Beacoin"
          className=" md:hidden"
        />
        <p className=" text-sm md:text-base">{player.getBeacoins()}</p>
      </div>
    </>
  );
}
