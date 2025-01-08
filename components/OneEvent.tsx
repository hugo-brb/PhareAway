import React from "react";
import Image from "next/image";
import { useEvent, UseEvent } from "@/components/model/event";

interface OnEventProp {
  id_Event: number;
}

const OneEvent: React.FC<OnEventProp> = ({ id_Event }) => {
  const event = useEvent(id_Event);

  //let image = useImage(2);
  //console.log(image.getId(), image.getName(), image.getUrl());

  /*let lighthouse = useLighthouse(3);
  console.log(
    lighthouse.getId(),
    lighthouse.getName(),
    lighthouse.getDescription(),
    lighthouse.getCoordinates(),
    lighthouse.getUrl(),
    useImage(lighthouse.getImage())
  );*/

  return (
    <div className="flex flex-col gap-4 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
      <h1 className="font-bold">{event.getName()}</h1>
      <div className="flex flex-row gap-9">
        <Image
          className="w-24 h-24"
          width={96}
          height={96}
          src={event.getImage().getUrl() || ""}
          alt="img_evenement"
        />
        <span className="text-wrap text-center max-w-[50%]">
          {event.getDescription()}
        </span>
        <span className="border-l-2 pl-10 border-black text-wrap text-center">
          Heure : {event.getDuration()}h<br />
          Lieu : {event.getLighthouse().getName()} <br />
          Date : {event.getDate()}
        </span>
      </div>
    </div>
  );
};
export default OneEvent;
