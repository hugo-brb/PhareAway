import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useImage, UseImage } from "./Image";

export type UseExtention = {
  ExtentionData: ExtentionData;
  getId: () => number;
  getName: () => string;
  getPrice: () => number;
  getOwned: () => boolean;
  getType: () => string;
  getImage: () => UseImage;
};

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface ExtentionData {
  id: number;
  name: string;
  price: number;
  owned: boolean;
  type: string;
  id_image: number;
}

export function useExtention(id: number) {
  const [extentionData, setExtentionData] = useState<ExtentionData>({
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
          const request = await supabaseData
            .from("Extension")
            .select()
            .eq("id", id)
            .single();
          if (request.data) {
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
        console.error("Erreur lors de la récupération des données");
      }
    };
    fetchExtentionData();
  }, [id]);

  //methodes
  const methods = {
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
    getImage: () => {
      return useImage(extentionData.id_image);
    },
  };
  return { extentionData, ...methods };
}
