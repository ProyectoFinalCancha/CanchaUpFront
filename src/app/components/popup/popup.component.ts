import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @ViewChild('content') content!: TemplateRef<any>; // Obtener la referencia a la plantilla

  constructor(private modalService: NgbModal) {}

  openPopup() {
    const modalRef = this.modalService.open(this.content); // Pasar la plantilla al modalService
    // Puedes configurar el modalRef aquí, si es necesario
  }
}
