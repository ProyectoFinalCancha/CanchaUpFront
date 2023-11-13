import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  
  encargadoForm!: FormGroup;
  encargados: Encargado[] = [];
  telefonoFiltrado: string = '';

  constructor(private fb: FormBuilder,private encargadoService: EncargadoService,private router:Router,  public dialog: MatDialog) {}
  pageSizeOptions: number[] = [5, 15, 50, 100];
  pageSize: number = this.pageSizeOptions[0];
  pageIndex: number = 0;
  totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;




  ngOnInit() {
    this.encargadoForm = this.fb.group({
      id: [null],
      telefono: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
    });
    this.obtenerEncargados();
  }


  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.obtenerEncargados();
  }
  
  goToFirstPage() {
    this.pageIndex = 0;
    this.obtenerEncargados();
  }
  
  goToLastPage() {
    this.pageIndex = Math.floor(this.totalItems / this.pageSize);
    this.obtenerEncargados();
  }

  isTelefonoResaltado(telefono: string): boolean {
    return telefono.includes(this.telefonoFiltrado);
  }
  
  obtenerEncargados() {
    const offset = this.pageIndex * this.pageSize;
  
    this.encargadoService.getEncargados(offset, this.pageSize)
      .subscribe(
        (result: any) => {
          this.encargados = result.elements;
          this.totalItems = result.totalSize;
        },
        error => console.log('Error al obtener encargados', error)
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

  crearEncargado() {
    // Obtener los valores del formulario
    const nombre = this.encargadoForm.get('nombre')?.value;
    const apellido = this.encargadoForm.get('apellido')?.value;
    const dni = this.encargadoForm.get('dni')?.value;
    const telefono = this.encargadoForm.get('telefono')?.value;
    const password = 'luca1234';  // No está claro de dónde proviene el valor de la contraseña
  
    // Llamar al servicio para crear el encargado
    this.encargadoService.crearEncargado(nombre, apellido, dni, telefono, password)
      .subscribe(
        result => console.log(result),
        error => console.log('error', error)
      );
  }
  buscarEncargadoPorTelefono() {
    this.encargadoService.buscarEncargadoPorTelefono(this.telefonoFiltrado)
      .subscribe(
        result => {
          // Asignar los resultados de la búsqueda a encargados
          this.encargados = result;
        },
        error => console.log('Error al buscar encargado por teléfono', error)
      );
  }
  eliminarEncargado(encargado: Encargado) {
    const objectId = encargado.id?.toString(); // Suponiendo que el id es un número
    if (objectId) {
      this.encargadoService.eliminarEncargado(objectId)
        .subscribe(
          result => {
            console.log(result);
            // Luego de eliminar el encargado, actualiza la lista de encargados
            this.obtenerEncargados();
          },
          error => console.log('Error al eliminar encargado', error)
        );
    }
  }
  

  navegar(){
    this.router.navigate(['dashboard'])
  }
}
