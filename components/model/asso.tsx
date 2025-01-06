import React, { Component } from 'react';

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
interface AssoProps {}

interface AssoState extends AssoInterface {}

class Asso extends Component<AssoProps, AssoState> {
    constructor(props: AssoProps) {
      super(props);
  
      // Initialisation de l'état
      this.state = {
        user: {
            id: -1,
            mail: '',
            name: '',
            password: '',
          },
        url: '',

      };
    }

    create  = ( user: User, url: '' ) => {

    };
    
    read  = (id : number) => {
    
    };
    
    update = (user: User, url: '' ) => {
    
    };
    
    deleteentrée  = (id : number) => {
    
    };

      // Méthode pour supprimer un utilisateur
    delete(): void {
        this.setState({
            user: {
                id: -1,
                mail: '',
                name: '',
                password: '',
              },
            url: '',
    } );
  }
}

export default Asso;