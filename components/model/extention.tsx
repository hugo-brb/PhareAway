import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useImage, UseImage } from "./Image";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

//Définitions des types des méthodes de la classe Extention
export type UseExtention = {
  ExtentionData: ExtentionData;
  getId: () => number;
  getName: () => string;
  getPrice: () => number;
  getOwned: () => boolean;
  getType: () => string;
  getImage: () => UseImage;
};

//Définition des attributs de la classe Extention
interface ExtentionData {
  id: number;
  name: string;
  price: number;
  owned: boolean;
  type: string;
  id_image: number;
}

//Constructeur de la classe Extention
export function useExtention(id: number) {
  const [extentionData, setExtentionData] = useState<ExtentionData>({
    //Initialisation des attributs
    id: -1,
    name: "",
    price: 0,
    owned: false,
    type: "",
    id_image: 0,
  });

  useEffect(() => {
    const fetchExtentionData = async () => {
      try {
        if (id >= 1) {
          //Réccupération des données de la table Extention dans la base de données
          const request = await supabaseData
            .from("Extension")
            .select()
            .eq("id", id)
            .single();
          if (request.data) {
            //Initialisation des attributs avec les valeurs de la base de données si elles existent sinon on met des valeurs par défaut
            setExtentionData({
              id: id,
              name: request.data.name || "",
              price: request.data.price || 0,
              owned: request.data.owned || false,
              type: request.data.type || "",
              id_image: request.data.id_image || 0,
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données", e);
      }
    };
    fetchExtentionData();
  }, [id]);

  //Implementation des méthodes
  const methods = {
    //Getters
    getId: () => {
      return extentionData.id;
    },
    getName: () => {
      return extentionData.name;
    },
    getPrice: () => {
      return extentionData.price;
    },
    getOwned: () => {
      return extentionData.owned;
    },
    getType: () => {
      return extentionData.type;
    },
    useGetImage: () => {
      return useImage(extentionData.id_image);
    },
  };
  return { extentionData, ...methods };
}
