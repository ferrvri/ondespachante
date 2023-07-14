import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alterar-status-orcamento-modal',
  templateUrl: './alterar-status-orcamento-modal.component.html',
  styleUrls: ['./alterar-status-orcamento-modal.component.scss'],
})
export class AlterarStatusOrcamentoModalComponent  implements OnInit {

  selectedStatus: string = '';

  constructor(
    private _modalController: ModalController
  ) { }

  ngOnInit() {}

  change(data: any) {
    this._modalController.dismiss(data);
  }

}
