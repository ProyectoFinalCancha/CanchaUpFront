import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Encargado } from 'src/app/models/encargado';
import { EncargadoService } from 'src/app/services/encargado.service';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css'],
  providers:[EncargadoService]
})
export class EncargadoComponent{
  encargado!: Encargado;
  constructor(public encargadoService:EncargadoService){

  }
  ngOnInit() {
    this.getEncargados();
  }
  getEncargados(){
    this.encargadoService.getEncargados().subscribe((res) => {
      this.encargadoService.encargados = res;
    });
  }


  agregarEncargado(form:NgForm){
    this.encargadoService.createEncargado(form.value).subscribe((res) => {
      this.getEncargados();
      this.resetForm(form);
    })
  }

  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.encargadoService.encargado = new Encargado()
    }
  }

  borrarEncargado(id:number,form:NgForm){
    if(confirm("Estas seguro de borrar el Encargado?")){
      this.encargadoService.deleteEncargado(id).subscribe((res) =>{
        this.getEncargados();
        this.resetForm(form);
      })
    }
  }

}
