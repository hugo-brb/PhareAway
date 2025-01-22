import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Coin() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/"
      className="flex items-center outline-none gap-1 bg-transparent bg-clip-padding hover:bg-white hover:bg-opacity-60 rounded-l-[50px] rounded-r-2xl hover:backdrop-blur-md pl-0 pr-3 py-0 absolute top-3 left-3 md:left-10 z-50 cursor-pointer hover:drop-shadow-2xl duration-300 group"
      onMouseEnter={() => setIsHovered(true)} // Lorsque la souris entre dans le lien
      onMouseLeave={() => setIsHovered(false)} // Lorsque la souris quitte le lien
    >
      <Image
        src="/images/logos/logoSimple.webp"
        width={70}
        height={70}
        alt="Logo PhareAway"
        className="hidden md:block"
      />
      <Image
        src="/images/logos/logoSimple.webp"
        width={50}
        height={50}
        alt="Logo PhareAway"
        className="md:hidden"
      />
      {isHovered && (
        <p className="opacity-100 translate-x-0 transition-all duration-300 ease-in-out pl-2 pr-2">
          Accueil
        </p>
      )}
    </Link>
  );
}
