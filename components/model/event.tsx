import React, { Component } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface Image {
  id: number;
  name: string;
  url: string;
}

interface LighthouseData {
  id: number;
  name: string;
  description: string;
  coordinates: string[]; // Tableau de chaînes de caractères pour les coordonnées
  url: string;
  image: Image;
}

interface EventInterface {
  id: number;
  name: string;
  description: string;
  adress: string;
  url: string;
  date: string;
  duration: string;
  price: number;
  image: Image;
  lightHouse: LighthouseData;
}

// Définition des props et state
interface EventProps {}

interface EventState extends EventInterface {}

class Event extends Component<EventProps, EventState> {
  constructor(props: EventProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
      id: -1,
      name: "",
      description: "",
      adress: "",
      url: "",
      date: "",
      duration: "",
      price: 0,
      image: {
        id: -1,
        name: "",
        url: "",
      },
      lightHouse: {
        id: -1,
        name: "",
        description: "",
        coordinates: [],
        url: "",
        image: {
          id: -1,
          name: "",
          url: "",
        },
      },
    };
  }

  async create(
    id: number,
    name: string,
    description: string,
    adress: string,
    url: string,
    date: string,
    duration: string,
    price: number,
    image: Image
  ) {
    try {
      await supabaseData.from("Event").insert({
        id: id,
        name: name,
        description: description,
        adress: adress,
        url: url,
        date: date,
        duration: duration,
        price: price,
        image: image,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async read(id: number) {
    try {
      const { data, error } = await supabaseData
        .from("Event")
        .select()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const initEvent = {
        id: data?.[0]?.id,
        name: data?.[0]?.name,
        description: data?.[0]?.description,
        adress: data?.[0]?.adress,
        url: data?.[0]?.url,
        date: data?.[0]?.date,
        duration: data?.[0]?.durartion,
        price: data?.[0]?.price,
        image: data?.[0]?.image,
      };
      return initEvent;
    } catch (e) {
      console.log(e);
    }
  }

  async update(
    id: number,
    name: string,
    description: string,
    adress: string,
    url: string,
    date: string,
    duration: string,
    price: number,
    image: Image
  ) {
    try {
      await supabaseData.from("Event").update({
        id: id,
        name: name,
        description: description,
        adress: adress,
        url: url,
        date: date,
        duration: duration,
        price: price,
        image: image,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentre(id: number) {
    try {
      await supabaseData.from("Event").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer l'event
  delete = () => {
    this.setState({
      id: -1,
      name: "",
      description: "",
      adress: "",
      url: "",
      date: "",
      duration: "",
      price: 0,
      image: {
        id: -1,
        name: "",
        url: "",
      },
      lightHouse: {
        id: -1,
        name: "",
        description: "",
        coordinates: [],
        url: "",
        image: {
          id: -1,
          name: "",
          url: "",
        },
      },
    });
  };
}

export default Event;
