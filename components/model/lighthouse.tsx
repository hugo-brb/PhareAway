import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

//Définition des types des méthodes de la classe Lighthouse
export type UseLighthouse = {
  lighthouseData: LighthouseData;
  getId: () => number;
  getName: () => string;
  getDescription: () => string;
  getCoordinates: () => string;
  getUrl: () => string;
  getNbPhare: () => number;
};

//Définition des attributs de la classe Lighthouse
interface LighthouseData {
  id: number;
  name: string;
  description: string;
  coordinates: string;
  url: string;
  nbPhare: number;
}

//Constructeur de la classe Lighthouse
export function useLighthouse(id: number) {
  const [lighthouseData, setLighthouseData] = useState<LighthouseData>({
    //Initialisation des attributs
    id: -1,
    name: "",
    description: "",
    coordinates: "",
    url: "",
    nbPhare: 0,
  });

  useEffect(() => {
    const fetchLighthouseData = async () => {
      try {
        if (id >= 1) {
          //Récupération des données de la table Lighthouse dans la base de données
          const request = await supabaseData
            .from("Lighthouse")
            .select()
            .eq("id", id)
            .single();
          if (request.data) {
            //Initialisation des attributs avec les valeurs de la base de données si elles existent sinon on met des valeurs par défaut
            setLighthouseData({
              id: id,
              name: request.data.name || "",
              description: request.data.description || "",
              coordinates: request.data.description || "",
              url: request.data.url || "",
              nbPhare: 0,
            });
          }
        }
        const nbPhare = await supabaseData
          .from("Lighthouse")
          .select()
          .eq("enigme", true);
        if (nbPhare.data && nbPhare.data.length > 0) {
          setLighthouseData((prevState) => ({
            ...prevState,
            nbPhare: nbPhare.data.length,
          }));
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données", e);
      }
    };
    fetchLighthouseData();
  }, [id]);

  //Implementations des méthodes
  const methods = {
    //Getters
    getId: () => lighthouseData.id,
    getName: () => lighthouseData.name,
    getDescription: () => lighthouseData.description,
    getCoordinates: () => lighthouseData.coordinates,
    getUrl: () => lighthouseData.url,
    getNbPhare: () => lighthouseData.nbPhare,
  };
  return { lighthouseData, ...methods };
}
