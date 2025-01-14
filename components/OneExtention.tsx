import React from "react";
import Image from "next/image";
import { useExtention } from "./model/extention";

interface OnExtentionProp {
  id_extention: number;
}

const OneEvent: React.FC<OnExtentionProp> = ({ id_extention }) => {
  //création d'un instance de la classe extention
  const extention = useExtention(id_extention);
  //Récupération de l'image de associé a l'offre de extention
  const image = extention.useGetImage();

  // si l'offre de l'extention n'a pas encore charger affiché un message de chargement
  if (!extention) {
    return <p>Chargement de l&apos;événement...</p>;
  }

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
        {/*Affichage de l'image de l'offre d'extention si elle existe sinon affiché un place holder */}
        {image.getUrl() !== "" ? (
          <Image
            className="self-center rounded-lg"
            src={image.getUrl()}
            width={100}
            height={100}
            alt={extention.getName()}
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
          <p>{extention.getName()} </p>
          <p className=" opacity-50">{extention.getPrice()} beacoins</p>
        </div>
      </div>
    </>
  );
};

export default OneEvent;
