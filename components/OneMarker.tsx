import React, { useEffect, useState } from "react";
import Image from "next/image";

type MarkerProps = {
  id: number;
  popupText?: string;
  icone?: string;
  lien?: string;
  enigme?: boolean;
  descriptionTag: string;
  handleClickActive: (a: string) => void;
  handleClickActiveId: (id: number) => void;
};

const Marker: React.FC<MarkerProps> = ({
  id,
  popupText,
  enigme,
  lien,
  descriptionTag,
  handleClickActive,
  handleClickActiveId,
}) => {
  const [imageSrc, setImageSrc] = useState(
    `https://nereoll.github.io/imagesPhare/phares/${id}.png`
  );
  const [isImageLoaded, setIsImageLoaded] = useState<boolean | null>(null); // `true` si succès, `false` si échec
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);

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
  useEffect(() => {
    const fetchWikiSummary = async () => {
      if (descriptionTag != "null") {
        try {
          const response = await fetch(
            `https://fr.wikipedia.org/api/rest_v1/page/summary/${descriptionTag}`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const data = await response.json();
          setSummary(data.extract);
        } catch (err) {
          setError("Ce phare ne possède pas de description sur Wikipédia.");
          console.error(err);
        }
      }
    };
    fetchWikiSummary();
  }, [descriptionTag]);

  return (
    <div className="">
      <div className="flex flex-col gap-6 items-center">
        <h3 className="text-xl  text-center">{popupText}</h3>
        {isImageLoaded !== null && (
          <Image className="rounded-lg" src={imageSrc} alt={`Phare ${id}`} width={200} height={200} />
        )}
        {isImageLoaded === false && <p>Image par défaut chargée.</p>}
        {error ? <p>{error}</p> : <p>{summary}</p>}
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
