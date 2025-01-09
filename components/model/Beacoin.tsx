import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useImage, UseImage } from "./Image";

export type UseLighthouse = {
  beacoinData: BeacoinData;
  getId: () => number;
  getName: () => string;
  getPrice: () => number;
  getNumber: () => number;
};

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface BeacoinData {
  id: number;
  name: string;
  price: number;
  number: number;
}

export function useBeacoin(id: number) {
  const [beacoinData, setBeacoinData] = useState<BeacoinData>({
    id: -1,
    name: "",
    price: 0,
    number: 0,
  });

  useEffect(() => {
    const fetchBeacoinData = async () => {
      try {
        if (id >= 1) {
          const request = await supabaseData
            .from("Beacoin")
            .select()
            .eq("id", id)
            .single();

          console.log("Requete Image : ", request);
          if (request.data) {
            setBeacoinData({
              id: id,
              name: request.data.name || "",
              price: request.data.price || 0,
              number: request.data.number || 0,
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données");
      }
    };
    fetchBeacoinData();
  }, [id]);

  //methodes
  const methods = {
    getId: () => beacoinData.id,
    getName: () => beacoinData.name,
    getPrice: () => beacoinData.price,
    getNumber: () => beacoinData.number,
  };

  return { beacoinData, ...methods };
}
