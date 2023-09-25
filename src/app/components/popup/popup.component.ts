import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  name: string | null = null;
  age: number | null = null;

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    const modalRef: NgbModalRef = this.modalService.open(content);

    modalRef.result.then(
      (result) => {
        if (result === 'Ok') {
          // Código para manejar el cierre con "Ok"
        } else if (result === 'Cancelled') {
          // Código para manejar el cierre con "Cancelled"
        } else if (result === 'Aborted') {
          // Código para manejar el cierre con "Aborted"
        }
      },
      (reason) => {
        // Manejar el cierre del modal debido a razones no controladas
      }
    );
  }
}
