


export class Partido {
    
   
    id!:number;
    horario!: Horarios;
    dia!: Date | null;
    telefono!: string;
    precio!: string;
    estado!: EstadosPartido;

}


export enum EstadosPartido{
    'ESPERA','RECHAZADO','CONFIRMADO','COMPLETADO','MATCHMAKING'
}


export enum Horarios{
    '18 hs' = '18 hs',
    '19 hs' = '19 hs',
    '20 hs' = '20 hs',
    '21 hs' = '21 hs',
    '22 hs' = '22 hs',
    '23 hs' = '23 hs'
}