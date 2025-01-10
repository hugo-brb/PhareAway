import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

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

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface EventData {
  id: number;
  name: string;
  url: string;
  date: string;
  duration: number;
  price: number;
  description: string;
  id_lh: number;
  id_image: number;
}

export function useEvent(id: number) {
  const [eventData, setEventData] = useState<EventData>({
    id: -1,
    name: "",
    url: "",
    date: "",
    duration: 0,
    price: 0,
    description: "",
    id_lh: 0,
    id_image: 0,
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        if (id >= 1) {
          const request = await supabaseData
            .from("Event")
            .select()
            .eq("id", id);

          console.log("Requete Event : ", request);

          if (request.data && request.data.length > 0) {
            setEventData({
              id: id,
              name: request.data[0].name || "",
              url: request.data[0].url || "",
              date: request.data[0].date || "",
              duration: request.data[0].duration || 0,
              price: request.data[0].price || 0,
              description: request.data[0].description || "",
              id_lh: request.data[0].id_lh || 0,
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

  //methodes
  const methods = {
    //Getters
    getId: () => eventData.id,
    getName: () => eventData.name,
    getUrl: () => eventData.url,
    getDate: () => eventData.date,
    getDuration: () => eventData.duration,
    getPrice: () => eventData.price,
    getDescription: () => eventData.description,
    getLighthouse: () => eventData.id_lh,
    getImage: () => eventData.id_image,

    //Delete
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
        id_lh: 0,
        id_image: 0,
      });
    },
  };

  return { eventData, ...methods };
}
