import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

//Définition des types des méthodes de la classe Event
export type UseEvent = {
  eventData: EventData;
  getName: () => string;
  getUrl: () => string;
  getDate: () => string;
  getDuration: () => number;
  getPrice: () => number;
  getDescription: () => string;
  getLighthouse: () => number;
  getImage: () => number;
  delete: () => Promise<void>;
};

///Définition des attributs de la classe Event
interface EventData {
  id: number;
  name: string;
  url: string;
  date: string;
  duration: number;
  price: number;
  description: string;
  id_lighthouse: number;
  id_image: number;
}

//Constructeur de la classe Event
export function useEvent(id: number) {
  const [eventData, setEventData] = useState<EventData>({
    //Initialisation des attributs
    id: -1,
    name: "",
    url: "",
    date: "",
    duration: 0,
    price: 0,
    description: "",
    id_lighthouse: 0,
    id_image: 0,
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (id >= 1) {
          //Récupération des données de la table Event dans la base de données
          const request = await supabaseData
            .from("Event")
            .select()
            .eq("id", id);

          if (request.data && request.data.length > 0) {
            //Initialisation des attributs avec les valeurs de la base de données si elles existent sinon on met des valeurs par défaut
            setEventData({
              id: id,
              name: request.data[0].name || "",
              url: request.data[0].url || "",
              date: request.data[0].date || "",
              duration: request.data[0].duration || 0,
              price: request.data[0].price || 0,
              description: request.data[0].description || "",
              id_lighthouse: request.data[0].id_lighthouse || 0,
              id_image: request.data[0].id_image || 0,
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données", e);
      }
    };
    fetchEventData();
  }, [id]);

  //Initialisation des méthodes
  const methods = {
    //Getters
    getId: () => eventData.id,
    getName: () => eventData.name,
    getUrl: () => eventData.url,
    getDate: () => eventData.date,
    getDuration: () => eventData.duration,
    getPrice: () => eventData.price,
    getDescription: () => eventData.description,
    getLighthouse: () => eventData.id_lighthouse,
    getImage: () => eventData.id_image,

    //Méthode de suppression d'un évènement dans la base de données a partir de son id
    delete: async () => {
      await supabaseData.from("Event").delete().eq("id", eventData.id);
      setEventData({
        id: -1,
        name: "",
        url: "",
        date: "",
        duration: 0,
        price: 0,
        description: "",
        id_lighthouse: 0,
        id_image: 0,
      });
    },
  };

  return { eventData, ...methods };
}
