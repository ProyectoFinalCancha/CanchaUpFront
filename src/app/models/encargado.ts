export class Encargado {

    constructor(id=0, nombre='',apellido='',localidad='', dni='', password='', username=''){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.localidad = localidad;
        this.dni = dni;
        this.password = password;
        this.username = username;
        
        
        
       }
        id:number;
        nombre: string;
        apellido: string;
        localidad: string;
        dni: string;
        password: string;
        username: string;
}
