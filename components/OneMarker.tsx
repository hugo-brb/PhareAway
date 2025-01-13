import React from "react";
import Image from "next/image";

type MarkerProps = {
  id: number;
  popupText?: string;
  icone?: string;
  lien?: string;
  enigme?: boolean;
  handleClickActive: (a: string) => void;
  handleClickActiveId: (id: number) => void;
};

const Marker: React.FC<MarkerProps> = ({
  id,
  popupText,
  enigme,
  handleClickActive,
  handleClickActiveId,
}) => {
  return (
    <div className="">
      <div className="flex flex-col gap-6 items-center">
        <p>ID {id}</p>
        <h3 className="text-xl">{popupText}</h3>
        {/* //TODO: add the default image for the marker if the url returns a 404 */}
        <Image
          src={`https://nereoll.github.io/imagesPhare/phares/${id}.png`}
          alt=""
          width={200}
          height={200}
        />
        {enigme && (
          <button
            onClick={() => {
              handleClickActive("enigme");
              handleClickActiveId(id);
            }}
            className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg"
          >
            C&apos;est Phar&apos;ti
          </button>
        )}
      </div>
    </div>
  );
};
export default Marker;
