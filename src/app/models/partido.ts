import { Jugador } from "./jugador";



export class Partido {

   
    id!:number;
    dia!: Date;
    estado!: string | null;
    horario!: Horarios;
    numeroCancha!:string | null;
    precio!: number;
    telefono!:string | null;
    representante?:Jugador | null;// Puede ser Jugador o null  el ? siginifica que es opcional 
   

}


export enum EstadosPartido{
    'ESPERA','RECHAZADO','CONFIRMADO','COMPLETADO','MATCHMAKING'
}


export enum Horarios {
    _18_HS = '_18_HS',
    _19_HS = '_19_HS',
    _20_HS = '_20_HS',
    _21_HS = '_21_HS',
    _22_HS = '_22_HS',
    _23_HS = '_23_HS',
  }
  
  
