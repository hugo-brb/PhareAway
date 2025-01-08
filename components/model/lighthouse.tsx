import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useImage, UseImage } from "./Image";

export type UseLighthouse = {
  lighthouseData: LighthouseData;
  getId: () => number;
  getName: () => string;
  getDescription: () => string;
  getCoordinates: () => string;
  getUrl: () => string;
  getImage: () => UseImage;
};

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface LighthouseData {
  id: number;
  name: string;
  description: string;
  coordinates: string;
  url: string;
  image: number;
}

export function useLighthouse(id: number) {
  const [lighthouseData, setLighthouseData] = useState<LighthouseData>({
    id: -1,
    name: "",
    description: "",
    coordinates: "",
    url: "",
    image: 0,
  });

  useEffect(() => {
    const fetchLighthouseData = async () => {
      try {
        if (id >= 1) {
          const request = await supabaseData
            .from("Lighthouse")
            .select()
            .eq("id", id)
            .single();
          console.log("Requete Lighthouse : ", request);
          if (request.data && request.data.length > 0) {
            setLighthouseData({
              id: id,
              name: request.data[0].name || "",
              description: request.data[0].description || "",
              coordinates: request.data[0].description || "",
              url: request.data[0].url || "",
              image: request.data[0].id_image || 0,
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données");
      }
    };
    fetchLighthouseData();
  }, [id]);

  //methodes
  const methods = {
    getId: () => lighthouseData.id,
    getName: () => lighthouseData.name,
    getDescription: () => lighthouseData.description,
    getCoordinates: () => lighthouseData.coordinates,
    getUrl: () => lighthouseData.url,
    getImage: () => {
      return useImage(lighthouseData.image);
    },
  };
  return { lighthouseData, ...methods };
}
