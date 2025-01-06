import Link from "next/link";
import Image from "next/image";

interface MenuProps {
  nom: string;
}

export default function Coin({ nom }: MenuProps) {
  return (
    <>
      <Link
        href="/"
        className="flex items-center outline-none gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md px-3 py-1 absolute top-3 left-3 z-50 cursor-pointer hover:drop-shadow-2xl duration-300"
      >
        <Image
          src="/icones/logoSimple.svg"
          width={50}
          height={50}
          alt="Logo PhareAway"
        />
        <p>{nom}</p>
      </Link>
    </>
  );
}
