import { Component, Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Horarios } from 'src/app/models/horarios.enum';
import { Partido } from 'src/app/models/partido';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  partido: Partido = new Partido(); // Inicializa el objeto partido
  horarios = Object.values(Horarios);

  // Propiedad para rastrear si se ha seleccionado un día
  diaSeleccionado = false;
  horarioSeleccionado = false;
  nombre: any;
  dia: any;
  telefono: any;


  // nombre: string = '';
  // dia: Date | null = null;
  // telefono: string = '';


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partido // Cambia el tipo de data a Partido
  ) {
    this.partido = data; // Asigna el objeto Partido directamente
  }

  onDiaSeleccionado() {
    this.diaSeleccionado = true;
    console.log('Dia seleccionado:', this.diaSeleccionado);
  }
  onHorarioSeleccionado() {
    console.log('Horario seleccionado:', this.partido.horario);
    this.horarioSeleccionado = true;
  }
  
  guardarPartido() {
    console.log('Dia seleccionado:', this.diaSeleccionado);
    console.log('Horario seleccionado:', this.horarioSeleccionado);
  
    if (this.diaSeleccionado && this.horarioSeleccionado) {
      console.log('Guardar partido');
      // Realiza las acciones necesarias para guardar los datos, por ejemplo, envíalos a un servicio.
      // ...
  
      // Cierra el diálogo
      this.dialogRef.close();
    } else {
      // Muestra un mensaje de error si no se han seleccionado ambas opciones
      alert('Por favor, completa todos los campos antes de sacar turno.');
    }
  }
  


  abrirPopup(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      data: { nombre: this.nombre, dia: this.dia, horarios: this.horarios, telefono: this.telefono },
      panelClass: 'custom-dialog-container' // Aplica la clase personalizada
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nombre = result.nombre;
        this.dia = result.dia;
        this.horarios = result.horarios;
        this.telefono = result.telefono;
      }
    });
  }
}
