export class Jugador{

   constructor(oid=0, nombre='',apellido='',telefono='', mail='', password='', username=''){
    this.oid = oid;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.mail = mail;
    this.password = password;
    this.username = username;
    
    
    
   }
    oid:number;
    nombre: string;
    apellido: string;
    telefono: string;
    mail: string;
    password: string;
    username: string;
}
