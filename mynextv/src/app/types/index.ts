export interface Client {
    id?: number;
    nom: string;
    age: number;
  }
  
  export interface Voiture {
    id?: number;
    marque: string;
    matricule: string;
    model: string;
    idClient: number;
    client?: Client;
  }