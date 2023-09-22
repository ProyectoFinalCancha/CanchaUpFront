export class Jugador{

   constructor(id=0, nombre='',apellido='',telefono='', mail='', password='', username=''){
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.mail = mail;
    this.password = password;
    this.username = username;
    
    
    
   }
    id:number;
    nombre: string;
    apellido: string;
    telefono: string;
    mail: string;
    password: string;
    username: string;
}
