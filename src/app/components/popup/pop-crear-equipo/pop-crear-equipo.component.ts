import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Equipo } from 'src/app/models/equipo';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-pop-crear-equipo',
  templateUrl: './pop-crear-equipo.component.html',
  styleUrls: ['./pop-crear-equipo.component.css']
})
export class PopCrearEquipoComponent {

  equipo: { nombre: string, telefono: string } = { nombre: '', telefono: '' };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopCrearEquipoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Equipo,
    private equipoService: EquipoService
  ) {
    this.equipo = data;
  }

  crearEquipo(): void {
    // Llama al método del servicio para crear el equipo
    this.equipoService.crearEquipo(this.equipo.nombre, this.equipo.telefono).subscribe(
      (response) => {
        // Maneja la respuesta aquí, por ejemplo, cierra el diálogo.
        this.dialogRef.close();
      },
      (error) => {
        // Maneja los errores, por ejemplo, muestra un mensaje de error.
        console.error('Error al crear el equipo:', error);
      }
    );
  }
}
