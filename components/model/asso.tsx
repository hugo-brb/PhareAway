import { Component } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// Interface pour User
interface User {
  id: number;
  mail: string;
  name: string;
  password: string;
}

// Interface pour Asso
interface AssoInterface {
  user: User;
  url: string;
}

// Définition des props et state
/* eslint-disable @typescript-eslint/no-empty-interface */
interface AssoProps {}
interface AssoState extends AssoInterface {}
/* eslint-enable @typescript-eslint/no-empty-interface */

class Asso extends Component<AssoProps, AssoState> {
  constructor(props: AssoProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      url: "",
    };
  }

  async create(user: User, url: "") {
    try {
      await supabaseData.from("Asso").insert({
        user: user,
        url: url,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async read(id: number) {
    try {
      const { data, error } = await supabaseData
        .from("Asso")
        .select()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const initAsso = {
        user: data?.[0].user,
        url: data?.[0].url,
      };
      return initAsso;
    } catch (e) {
      console.log(e);
    }
  }

  async update(user: User, url: "") {
    try {
      await supabaseData.from("Asso").update({
        user: user,
        url: url,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentree(id: number) {
    try {
      await supabaseData.from("Asso").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer un utilisateur
  delete(): void {
    this.setState({
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      url: "",
    });
  }
}

export default Asso;
