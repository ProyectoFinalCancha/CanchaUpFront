import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Jugador } from 'src/app/models/jugador';
import { Partido } from 'src/app/models/partido';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.css'],
  providers:[PartidoService]
})
export class PartidosComponent {

  partido!:Partido;
  
  constructor(public partidoService : PartidoService) { }

  ngOnInit() {
    this.getPartidos();
  }


  getPartidos() {
    this.partidoService.getPartidos().subscribe((res) => {
      this.partidoService.partidos = res;
    });
  }


  agregarPartido(form:NgForm){
    this.partidoService.createPartido(form.value).subscribe((res) => {
      this.getPartidos();
      this.resetForm(form);
    })
  }

  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.partidoService.partido = new Partido()
    }
  }

  borrarPartido(id:number,form:NgForm){
    if(confirm("Estas seguro de borrar el Partido?")){
      this.partidoService.deletePartido(id).subscribe((res) =>{
        this.getPartidos();
        this.resetForm(form);
      })
    }
  }
}
