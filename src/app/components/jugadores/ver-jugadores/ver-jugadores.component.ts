import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Encargado } from 'src/app/models/encargado';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-ver-jugadores',
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css']
})
export class VerJugadoresComponent {
  constructor(
    public dialogRef: MatDialogRef<VerJugadoresComponent>,
    private jugadorService: JugadorService,
    
    @Inject(MAT_DIALOG_DATA) public data: Jugador
  ) { }

  onSaveChanges(): void {
    this.dialogRef.close(this.data); 
  }


  isValid(data: Jugador): boolean {
    // Valida la información según tus criterios
    return !!(data.nombre && data.apellido && data.telefono && data.mail && data.password );
  }

}












// EDITAR JUGADOR

  // onSaveChanges(): void {
  //   if (this.isValid(this.data)) {
  //     this.jugadorService.actualizarJugador(this.data).subscribe(
  //       updatedJugador => {
  //         this.data = updatedJugador;

  //         this.dialogRef.close(this.data);
  //       },
  //       error => {
  //         console.log('Error al actualizar jugador', error);
  //       }
  //     );
  //   } else {
  //     console.log('Error: Datos incompletos o inválidos.');
  //   }
  // }