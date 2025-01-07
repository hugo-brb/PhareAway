import React, { Component } from "react";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

interface Image {
  id: number;
  name: string;
  url: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: Image;
}

interface BeacoinInterface {
  product: Product;
  number: number;
}

// Définition des props et state
interface BeacoinProps {}

interface BeacoinState extends BeacoinInterface {}

class Beacoin extends Component<BeacoinProps, BeacoinState> {
  constructor(props: BeacoinProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
      product: {
        id: -1,
        name: "Beacoin",
        price: 0,
        image: {
          id: -1,
          name: "",
          url: "",
        },
      },
      number: 0,
    };
  }

  async create(id: number, name: string, price: number, number: number) {
    try {
      await supabaseData
        .from("Beacoin")
        .insert({ id: id, name: name, price: price, number: number });
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
      const initBecoin = {
        id: data?.[0]?.id,
        name: data?.[0]?.name,
        price: data?.[0]?.price,
        number: data?.[0]?.number,
      };
      return initBecoin;
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: number, name: string, price: number, number: number) {
    try {
      await supabaseData
        .from("Becoin")
        .update({ id: id, name: name, price: price, number: number });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentrée(id: number) {
    try {
      await supabaseData.from("Becoin").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer un utilisateur
  delete(): void {
    this.setState({
      product: {
        id: -1,
        name: "Beacoin",
        price: 0,
        image: {
          id: -1,
          name: "",
          url: "",
        },
      },
      number: 0,
    });
  }
}

export default Beacoin;
