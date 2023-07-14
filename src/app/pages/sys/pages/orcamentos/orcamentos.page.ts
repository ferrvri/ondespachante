
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AlterarStatusOrcamentoModalComponent } from 'src/app/shared/components/alterar-status-orcamento-modal/alterar-status-orcamento-modal.component';
import { DataSource } from 'src/app/shared/components/table/extensions/data-source.interface';
import { FilterOption } from 'src/app/shared/components/table/extensions/filter.option.interface';
import { Pagination } from 'src/app/shared/components/table/extensions/pagination.interface';
import { TableAction } from 'src/app/shared/components/table/extensions/table-action.interface';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';
import { HttpResponse } from 'src/app/shared/models/http-response/http-response.model';
import { OrcamentoModel } from 'src/app/shared/models/orcamento/orcamento.model';
import { OrcamentoViewModel } from 'src/app/shared/models/orcamento/orcamento.viewmodel';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.page.html',
  styleUrls: ['./orcamentos.page.scss'],
})
export class OrcamentosPage implements OnInit {

  dataSource: DataSource<any> = {
    cols: [],
    data: []
  }

  pagination: Pagination = {
    page: 1,
    pageSize: 10,
    size: 10
  }

  tableFilters: FilterOption[] = [
    {
      title: 'Status',
      value: 'Status',
      options: [
        {
          title: 'Aberto',
          value: 'A'
        }
      ]
    }
  ];

  actions: TableAction[] = [];

  dataLoaded: boolean = false;
  isApp: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _toastService: ToastService,
    private _platform: Platform,
    private _alertService: AlertService,
    private _modalService: ModalService
  ) {
    this.isApp = _platform.is('mobile');
  }

  ngOnInit() {
    this.dataLoaded = false;
    this.fetchData(this.pagination.page, this.pagination.pageSize);
  }

  fetchData(page: number = 1, pageSize: number = 10) {
    let url = '';

    this.dataSource.cols = [
      'ID',
      'Whatsapp',
      'Observação',
      'Placa',
      'Renavam',
      'Status'
    ];

    this.actions = [
      {
        title: 'Alterar status',
        func: (element: any) => this.changeStatus(element)
      },
      {
        title: 'Enviar Whats',
        func: (element: any) => this.enviarWhats(element)
      }
    ];

    url = API_URLS.Orcamento.All;

    this._httpService.get<HttpResponse<OrcamentoViewModel[]>>(url, {}, { page, pageSize }).then(data => {
      this.dataSource.data = data.data;
      this.pagination.page = data.pagination.page;
      this.pagination.pageSize = data.pagination.pageSize;
      this.pagination.size = data.pagination.size;
      this.dataLoaded = true;
    });
  }

  handlePageChange(page: number) {
    this.pagination.page = page;
    this.fetchData(page, this.pagination.pageSize);
  }

  changeStatus(element: OrcamentoViewModel) {
    this._modalService.show<string>(AlterarStatusOrcamentoModalComponent, { orcamento: element }).then(data => {
      this.changeOrcamentoStatus(element.ID, data);
    });
  }

  enviarWhats(element: OrcamentoViewModel) {
    this._alertService.show('Enviar mensagem no Whats', '', 'Digite o conteudo da mensagem', [
      {
        text: 'Enviar',
        handler: ($event) => {
          if ($event.msg) {
            window.open(`
              https://api.whatsapp.com/send/?phone=55${element.Whatsapp}&text=${$event.msg}&type=phone_number&app_absent=0
            `, '_blank')!.focus();
          }
        }
      }
    ], [
      {
        placeholder: 'Mensagem',
        type: 'textarea',
        id: 'msg',
        name: 'msg'
      }
    ]);
  }

  changeOrcamentoStatus(orcamento_id: number, orcamento_status: string) {
    this._httpService.put(API_URLS.Orcamento.UpdateStatus, { orcamento_id }, { orcamento_status }).then(data => {
      this.fetchData(this.pagination.page, this.pagination.pageSize);
    });
  }
}