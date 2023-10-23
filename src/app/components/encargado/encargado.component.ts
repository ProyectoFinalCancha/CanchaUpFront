import { Component, OnInit, ViewChild } from '@angular/core';
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
export class EncargadoComponent implements OnInit{

  encargados: Encargado[] = []
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
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


  constructor(private encargadoService: EncargadoService, private router: Router) {}


  ngOnInit(): void {
    this.getEncargados(); 
  }

  getEncargados() {
    this.encargadoService.verEncargados()
      .subscribe(encargados => {
        this.encargados = encargados;
      });
  }

  navegar() {
    this.router.navigateByUrl("/adminDash")
  }


  buscarEncargado(telefono: string) {
    this.encargadoService.buscarEncargado(telefono)
      .subscribe(encargado => {
        if (encargado) {
          // Hacer algo con el encargado encontrado
          console.log('Encargado encontrado:', encargado);
        } else {
          // El encargado no se encontró, puedes manejarlo aquí
          console.log('Encargado no encontrado');
        }
      });
  }

  eliminarEncargado(objectId: string) {
    this.eliminarEncargado("11");
    this.encargadoService.borrarEncargado(objectId)
      .subscribe(result => {
        // Hacer algo con el resultado de la eliminación
        console.log('Resultado de la eliminación:', result);
      });
  }
  
  // ...
  
  // Ejemplo de cómo llamar a eliminarEncargado con un ID específico
  
}

  // resetForm(form: NgForm) {
  //   if (form) {
  //     form.reset();

  //   }
  // }

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


