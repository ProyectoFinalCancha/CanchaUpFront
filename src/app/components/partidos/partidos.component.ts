import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
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

  partidos!:Partido[];
  partidosPorPagina: Partido[] = [];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  goToFirstPage() {
    this.paginator.firstPage();
  }

  goToLastPage() {
    this.paginator.lastPage();
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.partidosPorPagina = this.partidos.slice(startIndex, endIndex);
  }
  constructor(public partidoService : PartidoService, private router:Router){
    this.partidoService = partidoService
   }

  ngOnInit() {
    this.getPartidos();
  }

  navegar(){
    this.router.navigateByUrl('/adminDash')
  }

  getPartidos() {
    this.partidoService.getPartidos().subscribe((res) => {
      this.partidoService.partidos = res;
    });
  }

  buscarPartido(){
    const telefono = '1';
    this.partidoService.getPartido().subscribe(
      (result) => console.log(result),
      (error) => console.error('Error:', error)
    );
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
