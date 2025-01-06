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

enum ExtensionType {
  DLC = "DLC",
  Skin = "Skin",
}

interface ExtensionInterface {
  product: Product;
  owneed: boolean;
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
      owneed: false,
      type: ExtensionType.DLC,
    };
  }

  create = (product: Product, owneed: boolean, type: ExtensionType) => {};

  read = (id: number) => {};

  update = (product: Product, owneed: boolean, type: ExtensionType) => {};

  deleteentrée = (id: number) => {};

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
      owneed: false,
      type: ExtensionType.DLC,
    });
  }
}

export default Extension;
