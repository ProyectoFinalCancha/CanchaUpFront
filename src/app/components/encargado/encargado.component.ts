import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Encargado } from 'src/app/models/encargado';
import { EncargadoService } from 'src/app/services/encargado.service';
import { VerEncargadoComponent } from './ver-encargado/ver-encargado.component';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css'],
  providers: [EncargadoService],
})
export class EncargadoComponent implements OnInit {
  encargadoForm!: FormGroup;
  encargados: Encargado[] = [];
  telefonoFiltrado: string = '';

  nuevoEncargado!: Encargado;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private encargadoService: EncargadoService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.nuevoEncargado = {
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      password: '',
    };
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
        this.encargados = data.filter((item) => item.telefono);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  tieneDatos(encargado: Encargado): boolean {
    // Excluye propiedades y claves que comienzan con '$$'
    const tieneDatos = Object.keys(encargado)
      .filter((key) => !key.startsWith('$$'))
      .some((key) => {
        const value = encargado[key as keyof Encargado];
        return this.hasValue(value);
      });

    if (!tieneDatos) {
      console.log('Fila sin datos:', encargado);
    }

    return tieneDatos;
  }

  private hasValue(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      // Si es un objeto, verifica si tiene al menos una propiedad con valor
      return Object.values(value).some((val) => this.hasValue(val));
    } else {
      // Verifica si el valor no es una cadena vacía ni nulo
      return value !== '' && value !== null;
    }
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

  crearEncargado(encargadoForm: NgForm) {
    if (encargadoForm.valid) {
      this.encargadoService
        .crearEncargado(this.nuevoEncargado)
        .pipe(
          finalize(() => {
            this.obtenerEncargados();
            this.nuevoEncargado = new Encargado();
            location.reload()
          })
        )
        .subscribe(
          () =>
            Swal.fire({
              icon: 'success',
              text: 'Se ha creado el Encargado',
            }),
          (error) =>
          
            Swal.fire({
              icon: 'error',
              text: 'No se pudo crear el Encargado',
            })
        );location.reload()
    }location.reload()
  }

  buscarEncargadoPorTelefono(telefono: string) {
    this.encargadoService.buscarEncargadoPorTelefono(telefono).subscribe(
      (data) => {
        console.log(data);
        this.encargados = Array.isArray(data) ? data : [data];
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  eliminarEncargado(instanceId: string | undefined) {
    if (instanceId !== undefined) {
      this.encargadoService.eliminarEncargado(instanceId).subscribe(
        (data) => {
          // console.log('Jugador eliminado:', data);
          location.reload()
          this.obtenerEncargados();
        },
        (error) => {
          location.reload()
          // console.error('Error al eliminar jugador', error);
        }
      );
    } else {
      console.log('El $$instanceId es undefined.');
      location.reload()
    }
  }

  limpiarDatos(){

    this.obtenerEncargados()
    this.telefonoFiltrado = ''
  }

  salir() {
    this.router.navigate(['/login']);
  }

  partidos() {
    this.router.navigate(['/partidos']);
  }

  jugadores() {
    this.router.navigate(['/jugadores']);
  }

  scrollToDiv() {
    const div = document.getElementById('tabla');
    console.log(div);
    if (div !== null) {
      div.scrollIntoView({ behavior: 'smooth' });
    }
  }
  irAEquipos(){
    this.router.navigate(['/equipoS'])
  }
}
