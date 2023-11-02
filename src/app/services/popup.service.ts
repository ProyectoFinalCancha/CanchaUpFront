import { Injectable } from '@angular/core';
import { PopupDialogComponent } from '../components/popup/popup-dialog/popup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PopCrearEquipoComponent } from '../components/popup/pop-crear-equipo/pop-crear-equipo.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  abrirPopup(horario: string, dia: Date, telefono: string): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      // width: '400px',
      
      data: { horario, dia, telefono }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes realizar acciones con los datos resultantes si es necesario.
    });
  }




 
}
