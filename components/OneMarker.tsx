import React, { useEffect, useState } from "react";
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
  lien,
  handleClickActive,
  handleClickActiveId,
}) => {
  const [imageSrc, setImageSrc] = useState(
    `https://nereoll.github.io/imagesPhare/phares/${id}.png`
  );
  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(null); // `true` si succès, `false` si échec

  useEffect(() => {
    // Vérifie si l'image est disponible ou non
    const checkImage = async () => {
      try {
        const response = await fetch(imageSrc);
        if (response.ok) {
          setIsImageLoaded(true); // L'image existe
        } else {
          setIsImageLoaded(false); // L'image n'existe pas
          setImageSrc("/icones/logoBaniere.png");
        }
      } catch {
        setIsImageLoaded(false); // En cas d'erreur réseau ou autre
        setImageSrc("/icones/logoBaniere.png");
      }
    };

    checkImage();
  }, [imageSrc]); // Re-vérifie chaque fois que l'URL change

  return (
    <div className="">
      <div className="flex flex-col gap-6 items-center">
        <h3 className="text-xl  text-center">{popupText}</h3>
        {isImageLoaded !== null && (
          <Image src={imageSrc} alt={`Phare ${id}`} width={200} height={200} />
        )}
        {isImageLoaded === false && <p>Image par défaut chargée.</p>}
        <a href={lien} target="_blank" className="text-cyan-700">
          Lien vers le site du phare
        </a>
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
