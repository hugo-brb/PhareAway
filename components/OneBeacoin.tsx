import React from "react";
import Image from "next/image";
import { useBeacoin } from "./model/Beacoin";
import Link from "next/link";

interface OnBeacoinProp {
  id_beacoin: number;
}

const OneEvent: React.FC<OnBeacoinProp> = ({ id_beacoin }) => {
  // Création d'une instance de la classe beacoin
  const beacoin = useBeacoin(id_beacoin);
  // Récupération de l'image associée à l'offre de beacoin
  const image = beacoin.useGetImage();
  // Si l'offre de beacoin n'a pas encore chargé, afficher un message de chargement
  if (!beacoin) {
    return <p>Chargement de l&apos;événement...</p>;
  }

  return (
    <>
      <Link
        href={{
          pathname: "/Payment",
          query: { id: beacoin.getId() }, // Passage de l'id
        }}
        className="flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer"
      >
        {/* Affichage de l'image de l'offre de beacoin si elle existe sinon afficher un placeholder */}
        {image.getUrl() !== "" ? (
          <Image
            className="self-center rounded-lg"
            src={image.getUrl()}
            width={100}
            height={100}
            alt={beacoin.getName()}
          />
        ) : (
          <Image
            className="self-center rounded-lg"
            src="/icones/logoBaniere.png"
            alt="Default logo"
            width={100}
            height={100}
          />
        )}
        <div className="flex flex-col justify-center items-center">
          <p>{beacoin.getName()}</p>
          {/* Affichage conditionnel de la balise p pour le bonus */}
          <p className="border-2 bg-blue-500 px-2 rounded-lg bg-opacity-5 text-yellow-400 font-bold" style={{ WebkitTextStroke: '0.1px blue' }}>
            + {beacoin.getBonus()} bonus
          </p>
          <div>
            <p className="text-black opacity-50">
              {beacoin.getPrice()}0 €
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default OneEvent;
