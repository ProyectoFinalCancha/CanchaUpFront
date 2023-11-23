import { Jugador } from "./jugador";



export class Partido {

   
    id!:number;
    dia!: Date;
    estado!: string | null;
    horario!: string;
    numeroCancha!:string | null;
    precio!: string;
    telefono!:string;
    representante?:Jugador | null;// Puede ser Jugador o null  el ? siginifica que es opcional 
   

}


export enum EstadosPartido{
    'ESPERA','RECHAZADO','CONFIRMADO','COMPLETADO','MATCHMAKING'
}


export enum Horarios{
    '18 hs' ,
    '19 hs' ,
    '20 hs' ,
    '21 hs' ,
    '22 hs' ,
    '23 hs' 
}