import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Encargado } from 'src/app/models/encargado';

@Component({
  selector: 'app-ver-encargado',
  templateUrl: './ver-encargado.component.html',
  styleUrls: ['./ver-encargado.component.css']
})
export class VerEncargadoComponent {

  constructor(
    public dialogRef: MatDialogRef<VerEncargadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Encargado
  ) {}

 
  onSaveChanges(): void {
    // Realiza aquí las acciones para guardar los cambios en el encargado
    this.dialogRef.close(this.data); // Envía los datos actualizados de vuelta al componente padre
  }

}
