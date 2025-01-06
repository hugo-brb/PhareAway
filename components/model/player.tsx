import React, { Component } from "react";

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
  becoins: number;
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
      becoins: 0,
      current_wolrd: 0,
      nb_completed_lh: 0,
    };
  }

  create = (
    user: User,
    becoins: number,
    current_wolrd: number,
    nb_completed_lh: number
  ) => {};

  read = (id: number) => {};

  update = (
    user: User,
    becoins: number,
    current_wolrd: number,
    nb_completed_lh: number
  ) => {};

  deleteentrée = (id: number) => {};

  // Méthode pour supprimer un player
  delete(): void {
    this.setState({
      user: {
        id: -1,
        mail: "",
        name: "",
        password: "",
      },
      becoins: 0,
      current_wolrd: 0,
      nb_completed_lh: 0,
    });
  }
}

export default Player;
