import React from "react";
import Image from "next/image";
import { useEvent, UseEvent } from "@/components/model/event";

interface OnEventProp {
  id_Event: number;
}

const OneEvent: React.FC<OnEventProp> = ({ id_Event }) => {
  const event = useEvent(id_Event);

  return (
    <div className="flex flex-row gap-9 py-6 px-6 bg-slate-600 bg-opacity-20 border-2 border-black">
      <Image
        className="w-24 h-24"
        width={96}
        height={96}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Phare_de_planier.jpg/260px-Phare_de_planier.jpg"
        }
        alt="img_evenement"
      />
      <span className="text-wrap text-center max-w-[50%]">
        {event?.getDescription()}
      </span>
      <span className="border-l-2 pl-10 border-black text-wrap text-center">
        Heure : {event?.getDuration()}h<br />
        Lieu : {event.getLighthouse().getName()} <br />
        Date : {event?.getDate()} <br />
      </span>
    </div>
  );
};
export default OneEvent;
