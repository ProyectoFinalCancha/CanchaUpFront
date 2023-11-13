import { EstadosPartido } from "./estadosPartido";
import { Horarios } from "./horarios.enum";

export class Partido {
    
   
    id!:number;
    horario!: Horarios;
    dia!: Date | null;
    telefono!: string;
    precio!: string;
    estado!: EstadosPartido;

}
