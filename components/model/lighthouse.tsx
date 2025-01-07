import React, { Component } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// Définition du type pour l'image
interface Image {
  id: number;
  name: string;
  url: string;
}

// Définition du type pour les données de Lighthouse
interface LighthouseData {
  id: number;
  name: string;
  description: string;
  coordinates: string[]; // Tableau de chaînes de caractères pour les coordonnées
  url: string;
  image: Image;
}

// Définition des props et state
interface LighthouseProps {}

interface LighthouseState extends LighthouseData {}

class Lighthouse extends Component<LighthouseProps, LighthouseState> {
  constructor(props: LighthouseProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
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
    };
  }

  async create(
    id: number,
    name: string,
    description: string,
    coordinates: string[],
    url: string,
    image: Image
  ) {
    try {
      await supabaseData.from("Lighthouse").insert({
        id: id,
        name: name,
        description: description,
        coordinates: coordinates,
        url: url,
        image: image,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async read(id: number) {
    try {
      const { data, error } = await supabaseData
        .from("Lighthouse")
        .select()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const initLighthouse = {
        id: data?.[0]?.id,
        name: data?.[0]?.name,
        description: data?.[0]?.description,
        coordonates: data?.[0]?.coordonates,
        url: data?.[0]?.url,
        image: data?.[0]?.image,
      };
      return initLighthouse;
    } catch (e) {
      console.log(e);
    }
  }

  async update(
    id: number,
    name: string,
    description: string,
    coordinates: string[],
    url: string,
    image: Image
  ) {
    try {
      await supabaseData.from("Lighthouse").update({
        id: id,
        name: name,
        description: description,
        coordinates: coordinates,
        url: url,
        image: image,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentrée(id: number) {
    try {
      await supabaseData.from("Lighthouse").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer le lighthouse
  delete = () => {
    this.setState({
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
    });
  };
}

export default Lighthouse;
