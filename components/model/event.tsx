import React, { Component } from 'react';

interface Image {
    url: string;
    title: string;
    description: string;
}

interface LighthouseData {
    id: number;
    name: string;
    description: string;
    coordinates: string[]; // Tableau de chaînes de caractères pour les coordonnées
    url: string;
    image: Image;
  }

interface EventInterface {
    id: number;
    name: string;
    description: string;
    adress: string;
    url: string;
    date: string;
    duration: string;
    price: number;
    image: Image;
    lightHouse: LighthouseData;
}

// Définition des props et state
interface EventProps {}

interface EventState extends EventInterface {}

class Event extends Component<EventProps, EventState> {
    constructor(props: EventProps) {
      super(props);
  
      // Initialisation de l'état
      this.state = {
        id: -1,
        name: '',
        description: '',
        adress: '',
        url: '',
        date: '',
        duration: '',
        price: 0,
        image: {
          url: '',
          title: '',
          description: '',
        },
        lightHouse: {
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
          },
      };
    }

    create  = ( id: number, name: string, description: string, adress: string, url: string, date: string, duration: string, price: number, image: Image) => {

    };

    read  = (id : number) => {
    
    };

    update = (id: number, name: string, description: string,adress: string,url: string,date: string,duration: string,price: number,image: Image) => {
    
    };

    deleteentrée  = (id : number) => {
    
    };

    // Méthode pour supprimer l'event
    delete = () => {
        this.setState({
          id: -1,
          name: '',
          description: '',
          adress: '',
          url: '',
          date: '',
          duration: '',
          price: 0,
          image: {
            url: '',
            title: '',
            description: '',
          },
            lightHouse: {
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
                },
        });
    };

}

export default Event;