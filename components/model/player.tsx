import React, { Component } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: "next_auth" } }
);
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
interface PlayerInterface {
  user: User;
  beacoins: number;
  current_wolrd: number;
  nb_completed_lh: number;
}

// Définition des props et state
interface PlayerProps {}

interface PlayerState extends PlayerInterface {}

class Player extends Component<PlayerProps, PlayerState> {
  constructor(props: PlayerProps) {
    super(props);

    // Initialisation de l'état
    this.state = {
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      beacoins: 0,
      current_wolrd: 0,
      nb_completed_lh: 0,
    };
  }

  async create(
    user: User,
    beacoins: number,
    current_world: number,
    nb_completed_lh: number
  ) {
    try {
      await supabaseData.from("players").insert({
        user: user,
        beacoins: beacoins,
        current_world: current_world,
        nb_completed_lh: nb_completed_lh,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async read(id: number) {
    try {
      const { data, error } = await supabaseData
        .from("players")
        .select()
        .eq("id", id);
      if (error) {
        throw error;
      }
      const initPlayer = {
        user: data[0]?.user,
        name: data[0]?.name,
        current_world: data[0]?.current_world,
        nb_completed_lh: data[0]?.nb_completed_lh,
      };
      return initPlayer;
    } catch (e) {
      console.log(e);
    }
  }

  async update(
    user: User,
    beacoins: number,
    current_world: number,
    nb_completed_lh: number
  ) {
    try {
      await supabaseData.from("players").update({
        user: user,
        beacoins: beacoins,
        current_world: current_world,
        nb_completed_lh: nb_completed_lh,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteentre(id: number) {
    try {
      await supabaseData.from("").delete().eq("id", id);
    } catch (e) {
      console.log(e);
    }
  }

  // Méthode pour supprimer un player
  delete(): void {
    this.setState({
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      beacoins: 0,
      current_wolrd: 0,
      nb_completed_lh: 0,
    });
  }
}

export default Player;
