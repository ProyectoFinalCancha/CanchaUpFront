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

      this.jugadorService.actualizarJugadorLocal(this.data);

      const jugadoresActualizados = this.jugadorService.getJugadoresLocalStorage();

      this.sharedService.actualizarJugadores(jugadoresActualizados);

      this.dialogRef.close(this.data);

    } else {
      console.log('Error: Datos incompletos o inválidos.');
    }
  }

  isValid(data: Jugador): boolean {
    if (!data.nombre || !data.apellido || !data.telefono || !data.mail || !data.password || !data.username) {
      return false;
    }

    return true;
  }

}
