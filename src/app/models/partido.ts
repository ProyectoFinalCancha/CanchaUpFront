import { Horarios } from "./horarios.enum";

export class Partido {
    
    
   constructor(id=0,horario=Horarios["18 hs"], dia: Date | null = null,telefono='', precio=''){
    this.id = id;
    this.horario = horario;
    this.dia = dia;
    this.telefono = telefono;
    this.precio = precio;

    
    
   }
    id:number;
    horario: Horarios;
    dia: Date | null;
    telefono: string;
    precio: string;

}
