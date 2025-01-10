import React from "react";
import Image from "next/image";
import { useBeacoin } from "./model/Beacoin";
import { useImage } from "./model/Image";

interface OnBeacoinProp {
  id_beacoin: number;
}

const OneEvent: React.FC<OnBeacoinProp> = ({ id_beacoin }) => {
  const beacoin = useBeacoin(id_beacoin);
  const image = beacoin.getImage();

  if (!beacoin) {
    return <p>Chargement de l'événement...</p>;
  }

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
        <Image
          src={image.getUrl()}
          width={100}
          height={100}
          alt={beacoin.getName()}
        />
        <div className=" flex flex-col justify-center items-center">
          <p>{beacoin.getNumber()} beacoins </p>
          <p className=" opacity-50">{beacoin.getPrice()} €</p>
        </div>
      </div>
    </>
  );
};

export default OneEvent;
