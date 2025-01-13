import React from "react";
import Image from "next/image";
import { useEvent } from "@/components/model/event";
import { useLighthouse } from "./model/lighthouse";
import { useImage } from "./model/Image";

interface OnEventProp {
  id_Event: number;
}

const OneEvent: React.FC<OnEventProp> = ({ id_Event }) => {
  const event = useEvent(id_Event);
  const image = useImage(event.getImage());
  const phare = useLighthouse(event.getLighthouse());

  if (!event) {
    return <p>Chargement de l&apos;événement...</p>;
  }

  return (
    <>
      <div className=" flex flex-col gap-4 items-center justify-center bg-white ring-2 ring-[--primary] rounded-lg py-4 px-7">
        {image.getUrl() !== "" ? (
          <Image
            className="self-center rounded-lg"
            src={image.getUrl()}
            alt="Image de l'event"
            width={150}
            height={150}
          />
        ) : (
          <Image
            className="self-center rounded-lg"
            src="/icones/logoBaniere.png"
            alt="Default logo event"
            width={150}
            height={150}
          />
        )}
        <hr className=" w-3/4" />
        <div className=" flex flex-col gap-2 w-full">
          <h1 className="text-2xl text-center text-[--primary] font-bold underline underline-offset-2">
            {event.getName()}
          </h1>
          <p className=" text-center text-lg mb-2 font-bold">
            {event.getDescription()}
          </p>
          <div className="flex items-center justify-between w-full gap-0 font-bold text-base">
            <div className="flex flex-col gap-1 justify-center items-center w-1/2 text-left md:text-right">
              <p>
                Date : <br className=" md:hidden" /> {event.getDate()}
              </p>
              <p>Durée : {event.getDuration()}h</p>
            </div>
            <div className="border-l-2 h-full border-[--text] self-stretch"></div>
            <div className="flex flex-col gap-1 justify-center items-center w-1/2 text-right md:text-left">
              <p>Lieu : {phare.getName() || "Chargement..."}</p>
              <p>Prix : {event.getPrice()}€</p>
            </div>
          </div>
        </div>
        <p className=" text-center italic text-sm">
          Lien de réservation :{" "}
          <a
            className=" underline underline-offset-2 text-[--primary] mt-2"
            href={event.getUrl()}
            target="_blank"
          >
            {event.getUrl()}
          </a>
        </p>
      </div>
    </>
  );
};

export default OneEvent;
