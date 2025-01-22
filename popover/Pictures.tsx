import { useState } from "react";
import Image from "next/image";
import { UsePlayer } from "../model/Player";
import axios from "axios";
import Tips from "@/components/Tips";

interface MenuProps {
  handleClickActive: (a: string) => void;
  handleClickTips: (a: string) => void;
  player: UsePlayer;
}

interface VisionResponse {
  responses: Array<{
    labelAnnotations: Array<{
      description: string;
      score: number;
    }>;
  }>;
}

export default function Pictures({ handleClickActive, player }: MenuProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPicValide, setPicValide] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const lastUploadTime = localStorage.getItem("lastUploadTime");
    const now = Date.now();

    if (
      lastUploadTime &&
      now - parseInt(lastUploadTime) < 24 * 60 * 60 * 1000
    ) {
      const remainingTime =
        24 * 60 * 60 * 1000 - (now - parseInt(lastUploadTime));
      const hours = Math.floor(remainingTime / (60 * 60 * 1000));
      const minutes = Math.floor(
        (remainingTime % (60 * 60 * 1000)) / (60 * 1000)
      );

      setError(
        `Vous devez attendre encore ${hours} heure(s) et ${minutes} minute(s) avant de pouvoir téléverser une nouvelle image.`
      );
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const base64Image = await convertToBase64(file);
      setImagePreview(base64Image); // Met à jour l'aperçu de l'image
      const isLighthouse = await analyzeImageWithVisionAPI(base64Image);

      if (isLighthouse) {
        player.setBeacoins(50);
        handleClickTips2("valide");
        localStorage.setItem("lastUploadTime", now.toString());
      } else {
        setPicValide(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(new Error("Erreur de conversion en Base64."));
      reader.readAsDataURL(file);
    });
  };

  const analyzeImageWithVisionAPI = async (
    base64Image: string
  ): Promise<boolean> => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_VISION_API_KEY;
    const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

    const requestPayload = {
      requests: [
        {
          image: { content: base64Image.split(",")[1] },
          features: [{ type: "LABEL_DETECTION", maxResults: 5 }],
        },
      ],
    };

    const response = await axios.post<VisionResponse>(endpoint, requestPayload);
    const labels = response.data.responses[0]?.labelAnnotations || [];
    return labels.some((label) =>
      label.description.toLowerCase().includes("lighthouse")
    );
  };

  const [tips, setTips] = useState("0");
  const handleClickTips2 = (a: string) => {
    setPicValide(false);
    setTips(a);
  };

  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col items-center self-center mb-5 md:mb-0 gap-5 md:gap-12 w-[95vw] h-[65vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className="absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
          onClick={() => handleClickActive("home")}
        >
          <Image
            src="/icones/xmark-solid.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>
        <button
          className="absolute top-2 left-2 md:top-5 md:left-5 flex flex-col items-center"
          onClick={() => handleClickTips2("1")}
        >
          <Image
            src="/images/mascotte/help.webp"
            alt="Aide"
            width={75}
            height={75}
            className=" hidden md:block"
          ></Image>
          <Image
            src="/images/mascotte/help.webp"
            alt="Aide"
            width={45}
            height={45}
            className="md:hidden"
          ></Image>
          <span className=" text-[0.6rem] md:text-[0.7rem]">
            Besoin d&apos;aide ?
          </span>
        </button>
        <h1 className="font-ouroboros text-center self-center mt-4 text-4xl md:text-7xl">
          Importer une image
        </h1>

        <div className="flex gap-2">
          <p className="text-center">
            Partage une image de phare et gagne <b>50</b> Beacoins en
            récompense.
          </p>
          <Image
            src="/images/BeaCoin.webp"
            width={25}
            height={25}
            alt="Beacoin"
            className=" hidden md:block"
          />
        </div>

        <div className="my-auto flex-col flex justify-center items-center gap-5">
          <label
            className="w-fit h-fit flex flex-col gap-5 cursor-pointer justify-center items-center border-2 border-dashed p-6 rounded-xl drop-shadow-2xl"
            htmlFor="pict"
          >
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="size-20 md:size-36"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6l-88 0-40 0-48 0-48 0c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z" />
              </svg>
            </div>
            <div className="flex justify-center items-center">
              <span className="font-normal text-center text-base text-gray-700">
                Clique pour importer une image.
              </span>
            </div>
            <input
              type="file"
              id="pict"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
          {loading && <p>Analyse en cours...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {imagePreview && ( // Affiche l'image téléchargée
            <div className="mt-5">
              <Image
                src={imagePreview}
                alt="Aperçu de l'image"
                className="max-w-full h-auto rounded-lg"
                width={700}
                height={700}
              />
            </div>
          )}
        </div>
        {tips === "valide" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Validation de l'image"
            cx="50%"
            cy="50%"
            text={
              "Bravo, tu viens d'uploader une image de phare, tu as donc gagné 50 Beacoins 👍"
            }
            img="/mascotte/yay.webp"
            next="0"
          />
        )}
        {tips === "1" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Partage de photos"
            cx="50%"
            cy="50%"
            text={
              "Cette fonctionnalité te permet de gagner <strong>50 Beacoins</strong> en partageant une <strong>image de phare</strong>."
            }
            img="/images/mascotte/happy.webp"
            next="2"
          />
        )}
        {tips === "2" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Partage de photos"
            cx="50%"
            cy="50%"
            text={
              "Attention, si tu proposes une image qui ne contient pas de phare, tu ne gagneras <strong>pas de Beacoins</strong>."
            }
            img="/images/mascotte/mad.webp"
            next="3"
          />
        )}
        {tips === "3" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Partage de photos"
            cx="50%"
            cy="50%"
            text={
              "Et tu ne peux pas partager plus d'une image de phare toutes les <strong>24 heures</strong>. Bonne continuation !"
            }
            img="/images/mascotte/struggle.webp"
            next="0"
          />
        )}

        <div className="">
          {isPicValide && (
            <Tips
              handleClickTips={handleClickTips2}
              title="Phare non reconnu"
              cx="50%"
              cy="50%"
              text={
                "Désolé, mais je ne reconnais pas de phare sur l’image que tu as partagée. Réessaie en t’assurant que le phare est <strong>bien visible</strong> !"
              }
              img="/images/mascotte/finfrerot.webp"
              next="0"
            />
          )}
        </div>
      </section>
    </main>
  );
}
