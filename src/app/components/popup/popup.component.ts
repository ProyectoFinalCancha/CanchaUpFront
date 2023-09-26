import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PopupDialogComponent } from './popup-dialog/popup-dialog.component';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  nombre: string = '';
  dia:  Date | null = null;
  telefono: string = '';

  constructor(public dialog: MatDialog) { }

  abrirPopup(): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '400px',
      data: { nombre: this.nombre, dia: this.dia, telefono:this.telefono }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.nombre = result.nombre;
        this.dia = result.dia;
        this.telefono = result.telefono;
      }
    });
  }
}
