import React, { Component } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface ImageInterface {
  id: number;
  name: string;
  url: string;
}

// Définition des props et state
interface ImageProps {}

interface ImageState extends ImageInterface {}

class Image extends Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
      id: -1,
      name: "",
      url: "",
    };
  }

  async create(id: number, name: string, url: string) {
    try {
      await supabaseData.from("Image").insert({ id: id, name: name, url: url });
    } catch (e) {
      console.log(e);
    }
  }

  async read(id: number) {
    try {
      const { data, error } = await supabaseData
        .from("Image")
        .select()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const initimage = {
        id: data?.[0]?.id,
        name: data?.[0]?.name,
        url: data?.[0]?.url,
      };
      return initimage;
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: number, name: string, url: string) {
    try {
      await supabaseData.from("Image").update({ id: id, name: name, url: url });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentre(id: number) {
    try {
      await supabaseData.from("Image").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer un utilisateur
  delete(): void {
    this.setState({
      id: -1,
      name: "",
      url: "",
    });
  }
}

export default Image;
