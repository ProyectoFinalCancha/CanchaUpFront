import { Component, Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Horarios } from 'src/app/models/horarios.enum';
import { Partido } from 'src/app/models/partido';



@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  partido: Partido = new Partido(); // Inicializa el objeto partido
  horarios = Object.values(Horarios);

  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partido // Cambia el tipo de data a Partido
  ) {
    this.partido = data; // Asigna el objeto Partido directamente
  }

  guardarPartido() {
    // Realiza las acciones necesarias y luego cierra el diálogo con los datos actualizados del partido.
    this.dialogRef.close(this.partido);
  }
}
