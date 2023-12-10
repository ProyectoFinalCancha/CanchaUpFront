export class SolicitudEquipo {
    id?:string;
    diaString: string;
    telefono: string;
    horarioSting: string;
  
    constructor(diaString: string, telefono: string, horarioSting: string) {
      this.diaString = diaString;
      this.telefono = telefono;
      this.horarioSting = horarioSting;
    }
  }
  