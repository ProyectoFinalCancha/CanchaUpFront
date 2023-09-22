export class Partido {

    
   constructor(id=0,horario='', dia: Date | null = null,telefono='', precio=''){
    this.id = id;
    this.horario = horario;
    this.dia = dia;
    this.telefono = telefono;
    this.precio = precio;

    
    
   }
    id:number;
    horario: string;
    dia: Date | null;
    telefono: string;
    precio: string;

}
