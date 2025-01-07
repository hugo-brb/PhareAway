import React, { Component } from "react";
import { createClient } from "@supabase/supabase-js";
import { getHash } from "next/dist/server/image-optimizer";

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

enum ExtensionType {
  DLC = "DLC",
  Skin = "Skin",
}

interface ExtensionInterface {
  product: Product;
  owned: boolean;
  type: ExtensionType;
}

// Définition des props et state
interface ExtensionProps {}

interface ExtensionState extends ExtensionInterface {}

class Extension extends Component<ExtensionProps, ExtensionState> {
  constructor(props: ExtensionProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
      product: {
        id: -1,
        name: "",
        price: 0,
        image: {
          id: -1,
          name: "",
          url: "",
        },
      },
      owned: false,
      type: ExtensionType.DLC,
    };
  }

  async create(product: Product, owned: boolean, type: ExtensionType) {
    try {
      await supabaseData.from("Extension").insert({
        product: product,
        owned: owned,
        type: type,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async read(id: number) {
    try {
      const { data, error } = await supabaseData
        .from("Extension")
        .select()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const initExtension = {
        id: data?.[0]?.id,
        owned: data?.[0]?.owned,
        type: data?.[0]?.type,
      };
      return initExtension;
    } catch (e) {
      console.log(e);
    }
  }

  async update(product: Product, owned: boolean, type: ExtensionType) {
    try {
      await supabaseData
        .from("Extension")
        .update({ product: product, owned: owned, type: type });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentrée(id: number) {
    try {
      await supabaseData.from("Extension").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer un player
  delete(): void {
    this.setState({
      product: {
        id: -1,
        name: "",
        price: 0,
        image: {
          id: -1,
          name: "",
          url: "",
        },
      },
      owned: false,
      type: ExtensionType.DLC,
    });
  }
}

export default Extension;
