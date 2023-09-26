import { Component, Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardar() {
    // Realiza las acciones necesarias y luego cierra el diálogo con los datos que deseas devolver.
    this.dialogRef.close({ nombre: this.data.nombre, email: this.data.email });
  }
}
