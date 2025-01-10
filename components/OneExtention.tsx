import React from "react";
import Image from "next/image";
import { useExtention } from "./model/extention";
import { useImage } from "./model/Image";

interface OnExtentionProp {
  id_extention: number;
}

const OneEvent: React.FC<OnExtentionProp> = ({ id_extention }) => {
  const extention = useExtention(id_extention);
  console.log(
    "extention : ",
    extention.getId() +
      " " +
      extention.getName() +
      " " +
      extention.getPrice() +
      " " +
      extention.getOwned() +
      " " +
      extention.getType() +
      " " +
      extention.useGetImage()
  );
  const image = extention.useGetImage();
  if (!extention) {
    return <p>Chargement de l'événement...</p>;
  }

  return (
    <>
      <div className=" flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer">
        <Image
          src={image.getUrl()}
          width={100}
          height={100}
          alt={extention.getName()}
        />
        <div className=" flex flex-col justify-center items-center">
          <p>{extention.getName()} </p>
          <p className=" opacity-50">{extention.getPrice()} beacoins</p>
        </div>
      </div>
    </>
  );
};

export default OneEvent;