import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Encargado } from 'src/app/models/encargado';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-ver-jugadores',
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css']
})
export class VerJugadoresComponent {
  constructor(
    public dialogRef: MatDialogRef<VerJugadoresComponent>,
    private jugadorService: JugadorService,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: Jugador
  ) { }


  onSaveChanges(): void {
    if (this.isValid(this.data)) {
      // Llama al servicio para actualizar el jugador
      this.jugadorService.actualizarJugador(this.data).subscribe(
        updatedJugador => {
          // Actualiza la referencia al objeto en el componente principal
          this.data = updatedJugador;

          // Cierra el diálogo y pasa el jugador actualizado
          this.dialogRef.close(this.data);
        },
        error => {
          console.log('Error al actualizar jugador', error);
        }
      );
    } else {
      console.log('Error: Datos incompletos o inválidos.');
    }
  }

  isValid(data: Jugador): boolean {
    // Valida la información según tus criterios
    return !!(data.nombre && data.apellido && data.telefono && data.mail && data.password && data.username);
  }

}
