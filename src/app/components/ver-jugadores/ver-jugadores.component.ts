import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-ver-jugadores',
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css'],
  providers:[JugadorService]
})
export class VerJugadoresComponent {

  jugadorPorPagina:Jugador[] = [];
  jugadores!: Jugador[]; // Define la variable para almacenar los datos del jugador

  constructor(public jugadorService: JugadorService, private router: Router, private sharedService: SharedService) {
    this.jugadorService = jugadorService
   }

  ngOnInit() {
    this.getJugadores();
  }

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
    this.jugadorPorPagina = this.jugadores.slice(startIndex, endIndex);
  }

  getJugadores() {
    this.jugadorService.getJugadores().subscribe((res) => {
      // this.jugadorService.jugadores = res;
      this.sharedService.jugadores = res;
    });
  }

  buscarJugador(id:any){
    const telefono = '1';
    this.jugadorService.getJugador(id).subscribe(
      (response) =>{
        console.log('Respuesta exitosa:', response);
      },
      (error) => {
       
        console.error('Error:', error);
      }
    )
  }
  agregarJugador(form:NgForm){
    this.jugadorService.crearJugador(form.value).subscribe((res) => {
      this.getJugadores();
      this.resetForm(form);
    })
  }

  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.jugadorService.jugador = new Jugador()
    }
  }

  borrarJugador(id:number,form:NgForm){
    if(confirm("Estas seguro de borrar el jugador?")){
      this.jugadorService.deleteJugador(id).subscribe((res) =>{
        this.getJugadores();
        this.resetForm(form);
      })
    }
  }

  navegar(){
    this.router.navigateByUrl('/adminDash')
  }
/*
  username!: string;
  password!: string;

  jugador = new FormControl('')



  constructor(private router: Router, private jugadorService: JugadorService) {

  }


  IraRegistro() {
    this.router.navigate(['/registro'])
  }

  IraDash() {
    this.router.navigate(['/dashboard'])
  }

  public verJugadores() {
    let resp = this.jugadorService.getAllJugadores();
    resp.subscribe(data => {
        console.log(data)
    })
  }*/

  
}
