import { Component, Inject } from '@angular/core';


import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Horarios, NumeroCancha, Partido } from 'src/app/models/partido';
import { MatDialog } from '@angular/material/dialog';
import { PartidoService } from 'src/app/services/partido.service';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

import { DatePipe } from '@angular/common';


import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent {
  partido: Partido = new Partido();
  telefono: string = '';
  partidos: Partido[] = [];
  horarios: string[] = Object.values(Horarios) as string[];
  horarioOptions = Object.keys(Horarios);
  nuevoPartido: Partido = new Partido();
  dia = new Date();

  horarioEnumValues = Object.values(Horarios);

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partido,
    private partidoService: PartidoService,
    private loginService: LoginService
  ) {
    this.telefono = this.loginService.getTelefono();
  this.nuevoPartido = new Partido();
  this.nuevoPartido.horario = this.horarioEnumValues[0];
  }

  ngOnInit() {
    this.loginService.telefono$.subscribe(telefono => {
      this.telefono = telefono;
    });
  }

  sacarTurno(partidoForm: NgForm): void {
    console.log('Valor de partidoForm:', partidoForm.value);
    const horarioString = partidoForm.value.horario;
    const telefono = this.telefono;
  
    const horario: Horarios | undefined = this.convertirStringAHorario(horarioString);
  
    if (horario !== undefined) {
      this.nuevoPartido.horario = horario;
  
      // Verificar si nuevoPartido.dia tiene un valor no nulo
      if (this.nuevoPartido.dia) {
        const formattedDia: string = this.formatDateForApi(this.nuevoPartido.dia);
  
        // Asegúrate de que formattedDia sea una cadena antes de usarlo
        if (typeof formattedDia === 'string') {
          this.partidoService.sacarTurno(this.nuevoPartido.horario, formattedDia, telefono)
            .subscribe(
              result => {
                Swal.fire({
                  title: "Ha sacado el turno con exito!",
                  // text: "That thing is still around?",
                  icon: "success"
                });
                console.log(result);
                // Recargar los partidos después de agregar uno nuevo
                // this.obtenerPartidos();
              },
              error => {
                console.error(error);
              }
            );
        } else {
          console.error('La fecha no se pudo formatear correctamente.');
        }
      } else {
        console.error('La fecha es nula.');
      }
    } else {
      console.error('Horario no reconocido:', horarioString);
    }
  }
  
  
  
  
  
  // private formatDateForApi(date: Date): string {
  //   return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  // }
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    // Verifica si event.value no es nulo antes de asignar
    if (event.value) {
      this.nuevoPartido.dia = event.value; // Asigna directamente la fecha
    } else {
      // Manejar el caso en que event.value es nulo (si es relevante para tu aplicación)
      console.error('La fecha es nula.');
    }
  }
  
  
  private formatDateForApi(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }
  
  
  
  
  
  
  



  abrirPopup(): void {
    if (this.telefono) {
      const dialogRef = this.dialog.open(PopupDialogComponent, {
        data: { dia: this.dia, horarios: this.horarios, telefono: this.telefono },
        panelClass: 'custom-dialog-container'
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Puedes hacer algo con el resultado si es necesario
        }
      });
    } else {
      console.error('El teléfono no está disponible.');
    }
  }





  transformarHorario(horario: string): string {
    return horario.replace('_', '').replace('_HS', ' hs');
  }


  convertirStringAHorario(horarioString: string): Horarios | undefined {
    console.log('Valor de horarioString al entrar a la función:', horarioString);
  
    // Verificar si horarioString es undefined o null
    if (!horarioString) {
      console.error('Horario no reconocido: ', horarioString);
      return undefined;
    }
  
    // Loguear el valor actual de horarioString
    console.log('Valor de horarioString antes de transformación:', horarioString);
  
    // Revertir la transformación realizada en la presentación
    const formattedString = horarioString.replace(' hs', '_HS');
  
    // Loguear el valor después de la transformación
    console.log('Valor de formattedString:', formattedString);
  
    const horarioEnum = this.horarioEnumValues.find((enumValue) => {
      console.log('Comparando:', enumValue.toString(), 'con', formattedString.trim());
      return enumValue.toString() === formattedString.trim();
    });
  
    if (horarioEnum) {
      // Loguear el valor de horarioEnum si se encuentra
      console.log('Valor de horarioEnum encontrado:', horarioEnum.toString());
      return horarioEnum as Horarios;
    } else {
      console.error('Horario no reconocido: ', horarioString);
      return undefined;
    }
  }
  
  

}
