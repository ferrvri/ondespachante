import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataSource } from 'src/app/shared/components/table/extensions/data-source.interface';
import { FilterOption } from 'src/app/shared/components/table/extensions/filter.option.interface';
import { Pagination } from 'src/app/shared/components/table/extensions/pagination.interface';
import { TableAction } from 'src/app/shared/components/table/extensions/table-action.interface';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';
import { ClienteViewModel } from 'src/app/shared/models/cliente/cliente.viewmodel';
import { HttpResponse } from 'src/app/shared/models/http-response/http-response.model';
import { OrcamentoViewModel } from 'src/app/shared/models/orcamento/orcamento.viewmodel';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  dataSource: DataSource<any> = {
    cols: [],
    data: []
  }

  pagination: Pagination = {
    page: 1,
    pageSize: 50,
    size: 10
  }

  tableFilters: FilterOption[] = [
    {
      title: 'Nome',
      value: 'Nome'
    },
    {
      title: 'CPF',
      value: 'CPF'
    },
    {
      title: 'Whatsapp',
      value: 'Whatsapp'
    }
  ];

  actions: TableAction[] = [];

  dataLoaded: boolean = false;
  isApp: boolean = false;

  constructor(
    private _httpService: HttpService,
    public _router: Router,
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
      'Nome',
      'CPF',
      'Whatsapp',
      'CEP',
      'Cidade',
      'Rua',
      'Bairro',
      'Numero'
    ];

    this.actions = [
      {
        title: 'Enviar Whats',
        func: (element: any) => this.enviarWhats(element)
      }
    ];

    url = API_URLS.Cliente.All;

    this._httpService.get<HttpResponse<ClienteViewModel[]>>(url, {}, { page, pageSize }).then(data => {
      this.dataSource.data = data.data;
      this.pagination.page = data.pagination.page;
      this.pagination.pageSize = data.pagination.pageSize;
      this.pagination.size = data.pagination.size;
      this.dataLoaded = true;
    });
  }

  onTableFilter(filter: { filterTerm: string, filterKey: string }) {
    if (filter.filterTerm.length < 1) {
      this.fetchData();
      return;
    }
  }

  handlePageChange(page: number) {
    this.pagination.page = page;
    this.fetchData(page, this.pagination.pageSize);
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

}