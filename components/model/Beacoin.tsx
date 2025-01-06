import React, { Component } from "react";

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

  create = (id: number, name: string, url: string) => {};

  read = (id: number) => {};

  update = (id: number, name: string, url: string) => {};

  deleteentrée = (id: number) => {};

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
