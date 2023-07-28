import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { ClienteRepositoryService } from 'src/app/repositories/cliente-repository/cliente.repository.service';
import { EditPageControl } from 'src/app/shared/components/edit-page/extensions/edit.page.control.interface';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';
import { ClienteFormFieldToLabelConverter } from 'src/app/shared/converters/cliente.formfield.to.label.converter';
import { ChangeClienteModel } from 'src/app/shared/models/cliente/change.cliente.model';
import { ClienteModel } from 'src/app/shared/models/cliente/cliente.model';
import { ClienteViewModel } from 'src/app/shared/models/cliente/cliente.viewmodel';
import { HttpResponse } from 'src/app/shared/models/http-response/http-response.model';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
})
export class CadastroClienteComponent implements OnInit {

  editPageControls: EditPageControl[] = [];

  cadastroClienteForm: FormGroup = new FormGroup({});
  clienteChangeModel: ChangeClienteModel = new ChangeClienteModel();
  formLabels: string[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _toastService: ToastService,
    private _clienteRepository: ClienteRepositoryService
  ) { }

  ngOnInit() {
    this.clienteChangeModel.cliente_estado.selectOptions = [
      {
        name: 'São Paulo',
        value: 'SP'
      }
    ];

    this.clienteChangeModel.cliente_cep.onChange = (change: any) => {
      this.searchCEP(change);
    }

    const entries: [string, any][] = Object.entries(this.clienteChangeModel);

    for (let i = 0; i < entries.length; i++) {
      this.formLabels.push(ClienteFormFieldToLabelConverter(entries[i][0]));
    }

    this.getPageParams();
  }

  getPageParams() {
    this.cadastroClienteForm.disable();

    this._activatedRoute.paramMap.pipe(debounceTime(1000)).subscribe(param => {
      this.cadastroClienteForm.enable();

      const whatsAppValueToPatch = param.get('cliente_whatsapp')?.toString();
      const id = +param.get('id')!.toString();

      if (id) {
        this.getClienteById(id);
      }

      if (whatsAppValueToPatch && Object.keys(this.cadastroClienteForm.controls).length) {
        this.cadastroClienteForm.patchValue({ cliente_whatsapp: whatsAppValueToPatch });
      }
    });
  }

  getClienteById(id: number) {
    this._clienteRepository.getById<HttpResponse<ClienteModel>>(id).then((data: HttpResponse<ClienteModel>) => {
      if (data.success) {
        this.cadastroClienteForm.patchValue(data.data);
      } else {
        this._toastService.show('Erro ao buscar informações do Cliente! Procure o suporte', 'danger');
      }
    });
  }

  onSubmit(form: any) {
    if (this.cadastroClienteForm.invalid) {
      return;
    }

    let value = form.value;
    delete value.cliente_id;

    this._clienteRepository.save(value).then(data => {
      this._toastService.show('Cliente cadastrado com sucesso!', 'success');
    }, _ => {
      this._toastService.show('Erro ao cadastrar Cliente! Procure o suporte', 'danger');
    });
  }

  searchCEP(cep: string) {
    this._httpService.rawGet(`https://viacep.com.br/ws/${cep}/json/`).then((data: any) => {
      this.cadastroClienteForm.get('cliente_endereco')?.setValue(data.logradouro);
      this.cadastroClienteForm.get('cliente_bairro')?.setValue(data.bairro);
      this.cadastroClienteForm.get('cliente_cidade')?.setValue(data.localidade);
      this.cadastroClienteForm.get('cliente_estado')?.setValue(data.uf);
    });
  }
}
