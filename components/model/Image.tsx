import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

//Définition des types des méthodes de la classe Image
export type UseImage = {
  imageData: ImageData;
  getId: () => number;
  getName: () => string;
  getUrl: () => string;
};

//Définition des attributs de la classe Image
interface ImageData {
  id: number;
  name: string;
  url: string;
}

//Constructeur de la classe Image
export function useImage(id: number) {
  const [imageData, setImageData] = useState<ImageData>({
    //Initialisation des attributs
    id: -1,
    name: "",
    url: "",
  });

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        if (id >= 1) {
          //Récupération des données de la table Image dans la base de données
          const request = await supabaseData
            .from("Image")
            .select()
            .eq("id", id)
            .single();

          if (request.data) {
            //Initialisation des attributs avec les valeurs de la base de données si elles existent sinon on met des valeurs par défaut
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

  //Implementation des méthodes
  const methods = {
    //Getters
    getId: () => imageData.id,
    getName: () => imageData.name,
    getUrl: () => imageData.url,
  };

  return { imageData, ...methods };
}
