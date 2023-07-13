import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { API_URLS } from '../shared/constants/api.urls.constant';
import { HttpResponse } from '../shared/models/http-response/http-response.model';
import { ServicoModel } from '../shared/models/servico/servico.model';
import { ToastService } from '../shared/services/toast/toast.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  servicos: ServicoModel[] = [
    {
      servico_title: 'Licenciamento',
      servico_descricao: 'Para efetuar o licenciamento ou a transferência de veículos todos os débitos do veículo devem estar quitados (IPVA, multas, taxas, seguro obrigatório).',
      servico_logo_url: ''
    },
    {
      servico_title: 'Transferência',
      servico_descricao: 'Para efetuar o licenciamento ou a transferência de veículos todos os débitos do veículo devem estar quitados (IPVA, multas, taxas, seguro obrigatório).',
      servico_logo_url: ''
    },
    {
      servico_title: '2 via CRV/CRLV',
      servico_descricao: 'Para efetuar o licenciamento ou a transferência de veículos todos os débitos do veículo devem estar quitados (IPVA, multas, taxas, seguro obrigatório).',
      servico_logo_url: ''
    },
    {
      servico_title: 'Emplacamento',
      servico_descricao: 'Para efetuar o licenciamento ou a transferência de veículos todos os débitos do veículo devem estar quitados (IPVA, multas, taxas, seguro obrigatório).',
      servico_logo_url: ''
    }
  ];

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    const pageWrapperElem = document.getElementById('page-wrapper');
    pageWrapperElem?.addEventListener('scroll', this.reveal);
    
    this.fetchData();
  }

  fetchData() {
    this._httpService.get<HttpResponse<ServicoModel[]>>(API_URLS.Servicos.All).then(data => {
      this.servicos = data.data;
    }, _ => {
      this._toastService.show('Erro inesperado. Contate o suporte', 'danger');
    });
  }

  reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < (windowHeight - elementVisible)) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

}
