import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useLighthouse, UseLighthouse } from "./lighthouse";
import { useImage, UseImage } from "./Image";

export type UseEvent = {};

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface EventData {
  id: number;
  name: string;
  coordinates: string;
  url: string;
  date: string;
  duration: number;
  price: number;
  description: string;
  id_Lighthouse: number;
  id_Image: number;
}

export function useEvent(id: number) {
  const [eventData, setEventData] = useState<EventData>({
    id: -1,
    name: "",
    coordinates: "",
    url: "",
    date: "",
    duration: 0,
    price: 0,
    description: "",
    id_Lighthouse: -1,
    id_Image: -1,
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
              coordinates: request.data[0].coordinates || "",
              url: request.data[0].url || "",
              date: request.data[0].date || new Date(),
              duration: request.data[0].duration || 0,
              price: request.data[0].price || 0,
              description: request.data[0].description || "",
              id_Lighthouse: request.data[0].id_lh || -1,
              id_Image: request.data[0].id_image || -1,
            });
          }
        }
      } catch (e) {
        console.error("Erreur lors de la récupération des données");
      }
    };
    fetchEventData();
  }, [id]);

  //methodes
  const methods = {
    //Getters
    getId: () => eventData.id,
    getName: () => eventData.name,
    getCoordinates: () => eventData.coordinates,
    getUrl: () => eventData.url,
    getDate: () => eventData.date,
    getDuration: () => eventData.duration,
    getPrice: () => eventData.price,
    getDescription: () => eventData.description,
    getIdLighthouse: () => eventData.id_Lighthouse,
    getIdImage: () => eventData.id_Image,

    //Setters
    setName: async (name: string) => {
      await supabaseData
        .from("Event")
        .update({ name: name })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        name: name,
      }));
    },

    setCoordinates: async (coordinates: string) => {
      await supabaseData
        .from("Event")
        .update({ coordinates: coordinates })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        coordinates: coordinates,
      }));
    },

    setUrl: async (url: string) => {
      await supabaseData
        .from("Event")
        .update({ url: url })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        url: url,
      }));
    },

    setDate: async (date: string) => {
      await supabaseData
        .from("Event")
        .update({ date: date })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        date: date,
      }));
    },

    setDuration: async (duration: number) => {
      await supabaseData
        .from("Event")
        .update({ duration: duration })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        duration: duration,
      }));
    },

    setPrice: async (price: number) => {
      await supabaseData
        .from("Event")
        .update({ price: price })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        price: price,
      }));
    },

    setDescription: async (description: string) => {
      await supabaseData
        .from("Event")
        .update({ description: description })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        description: description,
      }));
    },

    setLighthouse: async (lighthouse: UseLighthouse) => {
      await supabaseData
        .from("Event")
        .update({ id_lighthouse: lighthouse.getId() })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        lighthouse: lighthouse,
      }));
    },

    setImage: async (image: UseImage) => {
      await supabaseData
        .from("Event")
        .update({ id_image: image.getId() })
        .eq("id", eventData.id);
      setEventData((prev) => ({
        ...prev,
        image: image,
      }));
    },

    //Delete
    delete: async () => {
      await supabaseData.from("Event").delete().eq("id", eventData.id);
      setEventData({
        id: -1,
        name: "",
        coordinates: "",
        url: "",
        date: "",
        duration: 0,
        price: 0,
        description: "",
        id_Lighthouse: -1,
        id_Image: -1,
      });
    },
  };

  return { eventData, ...methods };
}
