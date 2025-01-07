import Link from "next/link";
import Image from "next/image";

interface MenuProps {
  nom: string;
}

export default function Coin({ nom }: MenuProps) {
  return (
    <Link
      href="/"
      className="flex items-center outline-none gap-1 bg-transparent bg-clip-padding hover:bg-white hover:bg-opacity-60 rounded-l-3xl rounded-r-xl hover:backdrop-blur-md pl-0 pr-1 py-0 absolute top-3 left-7 z-40 cursor-pointer hover:drop-shadow-2xl duration-300 group"
    >
      <Image
        src="/icones/logoSimple.png"
        width={70}
        height={70}
        alt="Logo PhareAway"
      />
      <p className="opacity-0 translate-x-2 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-x-0">
        Retour à l'accueil
      </p>
    </Link>
  );
}
