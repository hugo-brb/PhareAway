import React from "react";
import Image from "next/image";
import { useBeacoin } from "./model/Beacoin";
import Link from "next/link";

interface OnBeacoinProp {
  id_beacoin: number;
}

const OneEvent: React.FC<OnBeacoinProp> = ({ id_beacoin }) => {
  //création d'un instance de la classe beacoin
  const beacoin = useBeacoin(id_beacoin);
  //Récupération de l'image de associé a l'offre de beacoin
  const image = beacoin.useGetImage();
  // si l'offre de beacoin n'a pas encore charger affiché un message de chargement
  if (!beacoin) {
    return <p>Chargement de l&apos;événement...</p>;
  }

  return (
    <>
      <Link
        href="/Payment"
        className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer"
      >
        {/*Affichage de l'image de l'offre de beacoin si elle existe sinon affiché un place holder*/}
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
        <div className=" flex flex-col justify-center items-center">
          <p>{beacoin.getNumber()} beacoins </p>
          <p className=" opacity-50">{beacoin.getPrice()} €</p>
        </div>
      </Link>
    </>
  );
};

export default OneEvent;
