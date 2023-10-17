import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Encargado } from 'src/app/models/encargado';
import { EncargadoService } from 'src/app/services/encargado.service';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css'],
  providers: [EncargadoService]
})
export class EncargadoComponent {

  telefono: string = '';
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  encargados!: Encargado[];
  encargadosPorPagina: Encargado[] = [];
 

  goToFirstPage() {
    this.paginator.firstPage();
  }

  goToLastPage() {
    this.paginator.lastPage();
  }
  
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.encargadosPorPagina = this.encargados.slice(startIndex, endIndex);
  }


[x: string]: any;
  encargadoService: EncargadoService;

  constructor(encargadoService: EncargadoService,private router:Router) {
    this.encargadoService = encargadoService;
  }

  navegar(){
    this.router.navigateByUrl("/adminDash")
  }

  

  agregarEncargado(encargadoForm: NgForm) {
    const nombre = this.encargadoService.encargado.nombre;
    const apellido = this.encargadoService.encargado.apellido;
    const dni = this.encargadoService.encargado.dni;
    const localidad = this.encargadoService.encargado.telefono;
    const username = this.encargadoService.encargado.username;
    const password = this.encargadoService.encargado.password;

    var raw = JSON.stringify({
      nombre: {
        value: nombre,
      },
      apellido: {
        value: apellido,
      },
      dni: {
        value: dni,
      },
      localidad: {
        value: localidad,
      },
      username: {
        value: username,
      },
      password: {
        value: password,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Basic c3ZlbjpwYXNz",
        Accept: "application/json;profile=urn:org.apache.causeway/v2;suppress=all",
        "Content-Type": "application/json",
      },
      body: raw,
    };

    fetch(
      "http://localhost:8080/restful/services/simple.EncargadoServices/actions/crearEncargado/invoke",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.getEncargados(); // Agregar esta función si deseas cargar los encargados después de agregar uno nuevo.
        this.resetForm(encargadoForm);
      })
      .catch((error) => console.log("error", error));
  }




  getEncargados() {
    this.encargadoService.verEncargados().subscribe(
      (result) => console.log(result),
      (error) => console.error('Error:', error)
    );
  }




  resetForm(form: NgForm) {
    if (form) {
      form.reset();
      this.encargadoService.encargado = new Encargado();
    }
  }


  
  borrarEncargado(objectId: any) {
    objectId = '11';
    this.encargadoService.eliminarEncargado(objectId).subscribe(
      () => console.log('Encargado eliminado exitosamente.'),
      (error) => console.error('Error:', error)
    );
  }




  buscarEncargado() {
    const telefono = '1';
    this.encargadoService.buscarEncargado(telefono).subscribe(
      (result) => console.log(result),
      (error) => console.error('Error:', error)
    );
  }
}

// encargado!: Encargado;
// constructor(public encargadoService:EncargadoService){

// }
// ngOnInit() {
//   this.getEncargados();
// }
// getEncargados(){
//   this.encargadoService.getEncargados().subscribe((res) => {
//     this.encargadoService.encargados = res;
//   });
// }


// agregarEncargado(form:NgForm){
//   this.encargadoService.createEncargado(form.value).subscribe((res) => {
//     this.getEncargados();
//     this.resetForm(form);
//   })
// }

// resetForm(form:NgForm){
//   if(form){
//     form.reset();
//     this.encargadoService.encargado = new Encargado()
//   }
// }

// borrarEncargado(id:number,form:NgForm){
//   if(confirm("Estas seguro de borrar el Encargado?")){
//     this.encargadoService.deleteEncargado(id).subscribe((res) =>{
//       this.getEncargados();
//       this.resetForm(form);
//     })
//   }
// }


