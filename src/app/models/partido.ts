import { Jugador } from "./jugador";


export class Partido {
    id!: number;
    dia!: Date;
    estado!: EstadosPartido | null;
    horario!: Horarios;
    numeroCancha!: NumeroCancha;
    precio!: number;
    telefono!: string | null;
    representante?: Jugador | null;
}



export enum EstadosPartido {
    'ESPERA', 'RECHAZADO', 'CONFIRMADO', 'COMPLETADO', 'MATCHMAKING'
}

export enum NumeroCancha {
    UNO = 'UNO',
    DOS = 'DOS',
    TRES = 'TRES'
}

//// 
export enum Horarios {
    _18_HS = '_18_HS',
    _19_HS = '_19_HS',
    _20_HS = '_20_HS',
    _21_HS = '_21_HS',
    _22_HS = '_22_HS',
    _23_HS = '_23_HS',
}

