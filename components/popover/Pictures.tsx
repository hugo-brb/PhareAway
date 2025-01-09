import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { UsePlayer } from "../model/player";
import axios from "axios";
import EXIF from "exif-js";

interface MenuProps {
  handleClickActive: (a: string) => void;
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

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default function Pictures({ handleClickActive, player }: MenuProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      //await validateExifData(file);
      const base64Image = await convertToBase64(file);
      const isLighthouse = await analyzeImageWithVisionAPI(base64Image);

      if (isLighthouse) {
        alert(
          "Félicitation l'image a été validée avec succès ! Vous allez recevoir 50 BeaCoins !"
        );
        player.setBeacoins(50);
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

  const validateExifData = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        const image = new Image();
        image.onload = function () {
          EXIF.getData(image as any, function (this: any) {
            const make = EXIF.getTag(this, "Make");
            const model = EXIF.getTag(this, "Model");

            if (make || model) {
              resolve();
            } else {
              reject(new Error("Les métadonnées EXIF sont insuffisantes."));
            }
          });
        };
        image.onerror = () =>
          reject(new Error("Impossible de charger l'image pour analyse EXIF."));
        image.src = reader.result as string;
      };
      reader.onerror = () => reject(new Error("Erreur de lecture du fichier."));
      reader.readAsDataURL(file);
    });
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

  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col items-center self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className="absolute top-5 left-5 transform transition-transform duration-300 hover:-rotate-90"
          onClick={() => handleClickActive("home")}
        >
          <img
            src="/icones/xmark-solid.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>
        <h1 className="font-gravitas self-center mt-4 text-7xl">
          Importer une image
        </h1>
        <p>
          Partagez une image de phare et gagnez des BeaCoins en récompense.📸✨
        </p>
        <div className="my-auto">
          <label
            className="w-fit h-fit flex flex-col gap-5 cursor-pointer justify-center items-center border-2 border-dashed p-6 rounded-xl drop-shadow-2xl"
            htmlFor="pict"
          >
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="size-40"
              >
                <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6l-88 0-40 0-48 0-48 0c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z" />
              </svg>
            </div>
            <div className="flex justify-center items-center">
              <span className="font-normal text-xl">
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
        </div>
      </section>
    </main>
  );
}
