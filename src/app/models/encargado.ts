export class Encargado {

    constructor(id=0, nombre='',apellido='',telefono='', dni='', password='', username=''){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.dni = dni;
        this.password = password;
        this.username = username;
        
        
        
       }
        id:number;
        nombre: string;
        apellido: string;
        telefono: string;
        dni: string;
        password: string;
        username: string;
}
