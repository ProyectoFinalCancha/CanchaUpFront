import { Component, Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Horarios, Partido } from 'src/app/models/partido';
import { MatDialog } from '@angular/material/dialog';
import { PartidoService } from 'src/app/services/partido.service';



@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  partido: Partido = new Partido();

  
  
  horario!: string;
  diaSeleccionado: boolean = true;
  horarioSeleccionado = false;
  dia: any;
  telefono: any;
  horarios!: Horarios[]; // Cambia a un array de Horarios


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partido,
    private partidoService: PartidoService
  ) {
    this.partido = data || new Partido();
    this.partido.dia = new Date();
    this.horarios = Object.values(Horarios) as Horarios[];
  }

  sacarTurno() {
    if (this.diaSeleccionado && this.horarioSeleccionado && this.dia && this.horario && this.telefono) {
      this.partidoService.sacarTurno(this.horario, this.dia, this.telefono)
        .subscribe(
          result => {
            console.log(result);
            // Realiza cualquier lógica adicional después de la solicitud exitosa
          },
          error => {
            console.error('Error:', error);
            // Realiza cualquier manejo de errores aquí
          }
        );

      // Cierra el diálogo
      this.dialogRef.close();
    }
  }

  abrirPopup(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: { dia: this.dia, horarios: this.horarios, telefono: this.telefono },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dia = result.dia;
        this.horarios = result.horarios;
        this.telefono = result.telefono;
      }
    });
  }
}
