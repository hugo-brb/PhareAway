import React, { Component } from 'react';

// Définition du type pour l'image
interface Image {
  url: string;
  title: string;
  description: string;
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
        name: '',
        description: '',
        coordinates: [],
        url: '',
        image: {
          url: '',
          title: '',
          description: '',
        },
      };
    }


create  = ( id: number, name: string, description: string, coordinates: string[], url: string,image: Image) => {

};

read  = (id : number) => {

};

update = (id: number, name: string, description: string,coordinates: string[],url: string,image: Image) => {

};

deleteentrée  = (id : number) => {

};


// Méthode pour supprimer le lighthouse
delete = () => {
    this.setState({
      id: -1,
      name: '',
      description: '',
      coordinates: [],
      url: '',
      image: {
        url: '',
        title: '',
        description: '',
      },
    });
  };
}

export default Lighthouse;