import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Encargado } from 'src/app/models/encargado';
import { EncargadoService } from 'src/app/services/encargado.service';
import { VerEncargadoComponent } from './ver-encargado/ver-encargado.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css'],
  providers: [EncargadoService]
})
export class EncargadoComponent implements OnInit{
  
  encargadoForm!: FormGroup;
  encargados: Encargado[] = [];
  telefonoFiltrado: string = '';

  nuevoEncargado!:Encargado
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private fb: FormBuilder,private encargadoService: EncargadoService,private router:Router,  public dialog: MatDialog) {

    this.nuevoEncargado = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      password: '',
     
    }
  }
  currentPage = 1;
  pageSize = 10; // Ajusta el tamaño de la página según tus necesidades
  totalItems = 0;




  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginator?.previousPage();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.paginator?.nextPage();
    }
  }

  totalPages(): number {
    if (this.paginator) {
      this.totalItems = this.paginator.length || 0;
      return Math.ceil(this.totalItems / this.pageSize);
    }
    return 0;
  }


  ngOnInit() {
    this.obtenerEncargados();
  }



  isTelefonoResaltado(telefono: string): boolean {
    return telefono.includes(this.telefonoFiltrado);
  }
  
  obtenerEncargados() {
    this.encargadoService.getEncargados().subscribe(
      (data: Encargado[]) => {
        this.encargados = [...data];  // Copia directa del arreglo
        console.log('Datos del servidor:', data);
      },
      error => {
        console.log('Error', error);
      }
    );
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

  crearEncargado(encargadoForm:NgForm) {
    if (encargadoForm.valid) {
      this.encargadoService.crearEncargado(this.nuevoEncargado)
        .pipe(finalize(() => {
          this.obtenerEncargados();
          this.nuevoEncargado = new Encargado();
        }))
        .subscribe(
          () => console.log('Jugador creado exitosamente'),
          error => console.error('Error al crear jugador:', error)
        );
    }
  }



  buscarEncargadoPorTelefono(telefono:string) {
    this.encargadoService.buscarEncargadoPorTelefono(telefono)
    .subscribe(data => {
      console.log(data);
      if (telefono.trim() !== '') {
        // Si hay un teléfono especificado en el filtro, mostrar los resultados filtrados
        this.encargados = Array.isArray(data) ? data : [data];
      } else {
        // Si no hay teléfono especificado, mostrar todos los jugadores
        this.obtenerEncargados();
      }
      this.totalItems = this.encargados.length;
      this.currentPage = 1;
      this.paginator?.firstPage();
    }, error => {
      console.log('Error', error);
    });
  }




  eliminarEncargado(instanceId: string | undefined) {
    if (instanceId !== undefined) {
      this.encargadoService.eliminarEncargado(instanceId)
        .subscribe(data => {
          // console.log('Jugador eliminado:', data);
          this.obtenerEncargados();
        }, error => {
          // console.error('Error al eliminar jugador', error);
        });
    } else {
      console.log('El $$instanceId es undefined.');
    }
  }
  

  navegar(){
    this.router.navigate(['/admin2Dash'])
  }
}
