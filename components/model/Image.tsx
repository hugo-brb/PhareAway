import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

export type UseImage = {
  imageData: ImageData;
  getId: () => number;
  getName: () => string;
  getUrl: () => string;
};

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface ImageData {
  id: number;
  name: string;
  url: string;
}

export function useImage(id: number) {
  const [imageData, setImageData] = useState<ImageData>({
    id: -1,
    name: "",
    url: "",
  });

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        if (id >= 1) {
          const request = await supabaseData
            .from("Image")
            .select()
            .eq("id", id)
            .single();

          if (request.data) {
            setImageData({
              id: id,
              name: request.data.name || "",
              url: request.data.url || "",
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données", e);
      }
    };
    fetchImageData();
  }, [id]);

  //methodes
  const methods = {
    getId: () => imageData.id,
    getName: () => imageData.name,
    getUrl: () => imageData.url,
  };

  return { imageData, ...methods };
}
