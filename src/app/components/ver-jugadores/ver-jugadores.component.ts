import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/models/jugador';
import { JugadorService } from 'src/app/services/jugador.service';

@Component({
  selector: 'app-ver-jugadores',
  templateUrl: './ver-jugadores.component.html',
  styleUrls: ['./ver-jugadores.component.css'],
  providers:[JugadorService]
})
export class VerJugadoresComponent {

  jugador!: Jugador; // Define la variable para almacenar los datos del jugador

  constructor(public jugadorService: JugadorService) { }

  ngOnInit() {
    this.getJugadores();
  }


  getJugadores() {
    this.jugadorService.getJugadores().subscribe((res) => {
      this.jugadorService.jugadores = res;
    });
  }

  buscarJugador(){
    const oid = 1;
    this.jugadorService.getJugador(oid).subscribe(
      (response) =>{
        console.log('Respuesta exitosa:', response);
      },
      (error) => {
       
        console.error('Error:', error);
      }
    )
  }
  agregarJugador(form:NgForm){
    this.jugadorService.createJugador(form.value).subscribe((res) => {
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
