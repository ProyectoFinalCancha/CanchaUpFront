import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Encargado } from 'src/app/models/encargado';
import { EncargadoService } from 'src/app/services/encargado.service';
import { VerEncargadoComponent } from './ver-encargado/ver-encargado.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css'],
  providers: [EncargadoService]
})
export class EncargadoComponent implements OnInit{

  telefonoResaltado: string = ''; // Variable para almacenar el número de teléfono a resaltar
  telefonoFiltrado: string = ''; // Variable para almacenar el número de teléfono a filtrar

  encargados: Encargado[] = []
  encargado: Encargado = {
    id: 0,
    telefono: '',
    apellido: '',
    dni: '',
    nombre: '',
    password: ''
  };
 

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


  constructor(public encargadoService: EncargadoService, private router: Router,  public dialog: MatDialog) {}


  ngOnInit(): void {
    // this.getEncargados();
    this.getEncargadosLocalStorage(); ////////////////////////////////////////////////////LOCAL STORAGE 
    if (this.paginator) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
    }
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



  openEditDialog(encargado: Encargado): void {
    const dialogRef = this.dialog.open(VerEncargadoComponent, {
      width: '460px', // Personaliza el ancho según tus necesidades
      data: encargado, // Pasa el encargado al componente del diálogo
    });
  
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Aquí puedes manejar los datos actualizados si es necesario
        console.log('Encargado editado:', result);
      }
    });
  }



 

  agregarEncargado(form: NgForm) {
    const encargadoData = {
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      dni: form.value.dni,
      telefono: form.value.telefono,
      password: 'string' // Puedes proporcionar un valor para la propiedad "password" aquí
    };
  
    this.encargadoService.crearEncargado(encargadoData)
      .subscribe(
        (nuevoEncargado) => {
          // Manejar la respuesta exitosa
        },
        (error) => {
          // Manejar errores
        }
      );
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




    ///////////////////////////////////////                          ///////////////////////////
    ///////////////////////////////////////    LOCAL STORAGE        ///////////////////////////
  ///////////////////////////////////////                            ///////////////////////////

  agregarEncargadoEnLocalStorage(form: NgForm){
    const encargadoData = {
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      dni: form.value.dni,
      telefono: form.value.telefono,
      password: 'string' // Puedes proporcionar un valor para la propiedad "password" aquí
    };

    // Agregar el encargado localmente
    this.encargadoService.crearEncargadoLocal(encargadoData);

    // Actualizar la lista de encargados en el componente
    this.getEncargadosLocalStorage()
    // Recargar la página para ver los datos actualizados
  window.location.reload();
  }


  getEncargadosLocalStorage() {
    // Recuperar encargados almacenados en el localStorage
    const encargados = JSON.parse(localStorage.getItem('encargados') || '[]');
    this.encargados = encargados;
    console.log('Encargados cargados desde localStorage:', this.encargados)
  }


  
  eliminarEncargadoLocal(encargado: Encargado) {
    const telefonoABuscar = encargado.telefono;  
    // Busca el encargado por número de teléfono
    const index = this.encargados.findIndex(e => e.telefono === telefonoABuscar);
    if (index !== -1) {
      this.encargados.splice(index, 1);
      localStorage.setItem('encargados', JSON.stringify(this.encargados)); // Actualiza el almacenamiento local
    }
  }
  

   // Método para resaltar registros
   isTelefonoResaltado(encargadoTelefono: string): boolean {
    return encargadoTelefono === this.telefonoResaltado;
  }
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


