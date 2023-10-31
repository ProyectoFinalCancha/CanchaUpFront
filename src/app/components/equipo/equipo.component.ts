import { Component } from '@angular/core';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {
  nombre: string = '';
  telefono: string = '';
  equipos: any[] = [];

  constructor(private equipoService: EquipoService) {}

  ngOnInit() {}

  crearEquipo() {
    this.equipoService.crearEquipo(this.nombre, this.telefono).subscribe((response) => {
      // Manejar la respuesta de la solicitud aquí
    });
  }

  verEquipos() {
    this.equipoService.verEquipos().subscribe((response) => {
      this.equipos = response.value.collection;
      // Manejar la respuesta de la solicitud aquí
    });
  }

  buscarEquipo() {
    this.equipoService.buscarEquipo(this.telefono).subscribe((response) => {
      // Manejar la respuesta de la solicitud aquí
    });
  }
}
