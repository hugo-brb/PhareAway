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
    return <p>Chargement de l'événement...</p>;
  }

  return (
    <div className="flex flex-col gap-2 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
      <h1 className="text-2xl font-bold underline underline-offset-2 mb-4">
        {event.getName()}
      </h1>
      <div className="flex justify-between gap-12">
        {image.getUrl() !== "" ? (
          <Image
            className="self-center"
            src={image.getUrl()}
            alt="Image de l'event"
            width={96}
            height={96}
          />
        ) : (
          <Image
            src="/icones/logoBaniere.png"
            alt="Default logo event"
            width={200}
            height={200}
          ></Image>
        )}
        <p className="max-w-[20vw] text-center self-center">
          {event.getDescription()}
        </p>
        <div className="border-l border-[--text]"></div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-bold">Date : {event.getDate()}</p>
          <p className="text-lg font-bold">Durée : {event.getDuration()}h</p>
          <p className="text-lg font-bold">Prix : {event.getPrice()}€</p>
          <p className="text-lg font-bold">
            Phare : {phare.getName() || "Chargement..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OneEvent;
