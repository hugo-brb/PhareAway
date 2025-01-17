import { useState } from "react";
import Image from "next/image";
import { UsePlayer } from "../model/player";
import axios from "axios";
import Tips from "@/components/popover/Tips";

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

export default function Pictures({
  handleClickActive,
  player,
  handleClickTips,
}: MenuProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Nouvel état pour l'aperçu de l'image
  const [valide, setValide] = useState<boolean | null>(null);

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

    // Vérifie si l'utilisateur a déjà importé une image dans les 30 dernières secondes
    /*if (lastUploadTime && now - parseInt(lastUploadTime) < 30 * 1000) {
      const remainingTime = 30 * 1000 - (now - parseInt(lastUploadTime));
      const seconds = Math.floor(remainingTime / 1000);

      setError(
        `Veuillez patienter encore ${seconds} seconde(s) avant de pouvoir téléverser une nouvelle image.`
      );
      return;
    }*/

    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const base64Image = await convertToBase64(file);
      console.log(base64Image);
      setImagePreview(base64Image); // Met à jour l'aperçu de l'image
      const isLighthouse = await analyzeImageWithVisionAPI(base64Image);

      if (isLighthouse) {
        setValide(true);
        player.setBeacoins(50);
        localStorage.setItem("lastUploadTime", now.toString());
        handleClickActive("home");
      } else {
        setError("L'image ne contient pas de phare. Veuillez réessayer.");
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
    setTips(a);
  };

  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col items-center self-center mb-5 md:mb-0 gap-5 md:gap-12 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
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
          className="absolute top-5 left-5"
          onClick={() => handleClickTips2("1")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-8 h-8"
          >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        </button>
        <h1 className="font-gravitas text-center self-center mt-4 text-4xl md:text-7xl">
          Importer une image
        </h1>
        <p className="text-center">
          Partagez une image de phare et gagnez <b>50</b> Beacoins en
          récompense.📸✨
        </p>
        <div className="my-auto flex-col flex justify-center items-center gap-5">
          <label
            className="w-fit h-fit flex flex-col gap-5 cursor-pointer justify-center items-center border-2 border-dashed p-6 rounded-xl drop-shadow-2xl"
            htmlFor="pict"
          >
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="size-24 md:size-40"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6l-88 0-40 0-48 0-48 0c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z" />
              </svg>
            </div>
            <div className="flex justify-center items-center">
              <span className="font-normal text-center text-xl">
                Cliquer pour importer une image
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
          {valide && (
            <Tips
              handleClickTips={handleClickTips}
              title="Validation de l'image"
              cx={22}
              cy={12}
              text={
                "Bravo tu viens d'uploader une image de phare, tu gagnes donc 50 beacoins 👍"
              }
              img="/mascotte/temp.png"
              next="0"
            />
          )}
        </div>
        {tips === "1" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Partage de photo"
            cx={22}
            cy={12}
            text={
              "Cette fonctionnalité vous permet de gagner 50 Beacoins en partageant une image de phare."
            }
            img="/mascotte/temp.png"
            next="2"
          />
        )}
        {tips === "2" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Partage de photo"
            cx={22}
            cy={12}
            text={
              "Attention, si vous proposez une image qui ne contient pas de phare, vous ne gagnerez pas de Beacoins."
            }
            img="/mascotte/temp.png"
            next="3"
          />
        )}
        {tips === "3" && (
          <Tips
            handleClickTips={handleClickTips2}
            title="Partage de photo"
            cx={22}
            cy={12}
            text={
              "Et vous ne pouvez pas partager plus d'une image de phare toutes les 24 heures. Bonne continuation !"
            }
            img="/mascotte/temp.png"
            next="0"
          />
        )}
      </section>
    </main>
  );
}
