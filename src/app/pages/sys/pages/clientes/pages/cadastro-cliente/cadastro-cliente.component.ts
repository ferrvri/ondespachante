import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { EditPageControl } from 'src/app/shared/components/edit-page/extensions/edit.page.control.interface';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';
import { ClienteFormFieldToLabelConverter } from 'src/app/shared/converters/cliente.formfield.to.label.converter';
import { ChangeClienteModel } from 'src/app/shared/models/cliente/change.cliente.model';
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

  controls: EditPageControl[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _httpService: HttpService,
    private _toastService: ToastService
  ) { }

  ngOnInit() {
    this.getPageParams();

    this.clienteChangeModel.cliente_estado.selectOptions = [
      {
        name: 'São Paulo',
        value: 'SP'
      }
    ];

    this.clienteChangeModel.cliente_cep.onChange = (change: any) => {
      this.searchCEP(change);
    }

    const entries = Object.entries(this.clienteChangeModel);

    for (let i = 0; i < entries.length; i++) {
      this.editPageControls.push({
        controlType: entries[i][1].controlType,
        label: entries[i][1].label,
        name: entries[i][0],
        mask: entries[i][1].mask,
        selectOptions: entries[i][1].selectOptions,
        required: entries[i][1].required,
        disabled: entries[i][1].disabled,
        id: entries[i][1].id,
        blurred: entries[i][1].blurred,
        onChange: entries[i][1].onChange,
        value: entries[i][1].value
      });

      this.formLabels.push(ClienteFormFieldToLabelConverter(entries[i][0]));
    }
  }

  getPageParams() {
    this._activatedRoute.paramMap.subscribe(param => {
      const valueToPatch = param.get('cliente_whatsapp')?.toString();

      if (valueToPatch) {
        this.cadastroClienteForm.patchValue({ cliente_whatsapp: valueToPatch });
      }
    });
  }

  onSubmit(form: any) {
    if (this.cadastroClienteForm.invalid) {
      return;
    }

    let value = form.value;
    delete value.cliente_id;

    this._httpService.post(API_URLS.Cliente.Save, value).then(data => {
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
