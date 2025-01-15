import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { UseImage, useImage } from "./Image";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

//Définition des types des méthodes de la classe Beacoin
export type UseLighthouse = {
  beacoinData: BeacoinData;
  getId: () => number;
  getName: () => string;
  getPrice: () => number;
  getNumber: () => number;
  getImage: () => UseImage;
};

//Définition des attributs de la classe Beacoin
interface BeacoinData {
  id: number;
  name: string;
  price: number;
  number: number;
  id_image: number;
  bonus: number;
}

//Constructeur de la classe Beacoin
export function useBeacoin(id: number) {
  const [beacoinData, setBeacoinData] = useState<BeacoinData>({
    //Initialisation des attributs
    id: -1,
    name: "",
    price: 0,
    number: 0,
    id_image: 0,
    bonus: 0,
  });

  useEffect(() => {
    const fetchBeacoinData = async () => {
      try {
        if (id >= 1) {
          //Récupération des données de la table Beacoin dans la base de données
          const { data, error } = await supabaseData
          .from('Beacoin')
          .select(`
            id,
            name,
            price,
            number,
            id_image,
            bonus
          `)
          .eq("id", id)
          .single();
        
        if (error) {
          console.error('Error fetching data:', error);
          return; // Vous pouvez également gérer l'erreur d'une autre manière
        }
        
        if (data) {
          // Initialisation des attributs avec les valeurs de la base de données si elles existent sinon on met des valeurs par défaut
          setBeacoinData({
            id: id,
            name: data.name || "",
            price: data.price || 0,
            number: data.number || 0,
            id_image: data.id_image || 0,
            bonus: data.bonus || 0,
          });
        }
        
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données", e);
      }
    };
    fetchBeacoinData();
  }, [id]);

  //Initialisation des méthodes
  const methods = {
    //Getters
    getId: () => beacoinData.id,
    getName: () => beacoinData.name,
    getPrice: () => beacoinData.price,
    getNumber: () => beacoinData.number,
    getBonus: () => beacoinData.bonus,
    //Méthode qui créer un objet Image a l'aide de l'id_image de la classe Beacoin
    useGetImage: () => useImage(beacoinData.id_image),
  };

  return { beacoinData, ...methods };
}
