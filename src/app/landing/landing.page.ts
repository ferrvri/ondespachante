import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/services/http/http.service';
import { API_URLS } from '../shared/constants/api.urls.constant';
import { HttpResponse } from '../shared/models/http-response/http-response.model';
import { ServicoModel } from '../shared/models/servico/servico.model';
import { ToastService } from '../shared/services/toast/toast.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../shared/services/alert/alert.service';
import { customRenavamValidator } from '../shared/validators/custom.renavam.validator';

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

  ladingPageFormGroup = new FormGroup({
    orcamento_placa: new FormControl('', Validators.required),
    orcamento_renavam: new FormControl('', [Validators.required, customRenavamValidator(11)]),
    orcamento_whatsapp: new FormControl('', Validators.required)
  });

  loadingRequest: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    const pageWrapperElem = document.getElementById('page-wrapper');
    pageWrapperElem?.addEventListener('scroll', this.reveal);

    this.fetchData();
  }

  fetchData() {
    this._httpService.get<HttpResponse<ServicoModel[]>>(API_URLS.Servicos.All).then(data => {
      this.servicos = data.data.map(e => {
        return {
          ...e,
          servico_logo_url: environment.apiURL + API_URLS.Assets + e.servico_logo_url
        }
      });
    }, _ => {
      this._toastService.show('Erro inesperado. Contate o suporte', 'danger');
    });
  }

  reveal() {
    var reveals = document.querySelectorAll(".reveal");
    var windowHeight = window.innerHeight;
    var elementVisible = 150;

    for (var i = 0; i < reveals.length; i++) {
      var elementTop = reveals[i].getBoundingClientRect().top;
      if (elementTop < (windowHeight - elementVisible)) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }

    const arrowdownElem = document.querySelector('a.arrow.down');

    if (arrowdownElem) {
      const arrowTop = arrowdownElem.getBoundingClientRect().top;

      if (arrowTop < (windowHeight - elementVisible)) {
        arrowdownElem.remove();
      }
    }
  }

  submit() {
    console.log(this.ladingPageFormGroup)

    if (this.ladingPageFormGroup.invalid) {
      return;
    }

    const { value } = this.ladingPageFormGroup;
    let formValue = value;

    (formValue as any).orcamento_obs = 'Cliente temporario, necessário contato';
    (formValue as any).orcamento_status = 'A';

    this.loadingRequest = true;

    this._httpService.post(API_URLS.Orcamento.Save, value).then(async _ => {
      await this._alertService.show('Solicitação criada!', 'Um consultor irá entrar em contato com você', 'Sua solicitação foi enviada ao despachante, em breve retornaremos em contato! Aguarde', [
        {
          text: 'OK',
          id: 'ok',
          cssClass: 'text-black'
        }
      ]);
      
      this.loadingRequest = false;
    }, async e => {
      await this._toastService.show('Erro inesperado. Contate o suporte', 'danger');
      this.loadingRequest = false;
    });
  }

}
