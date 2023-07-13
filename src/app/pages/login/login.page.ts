import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';
import { HttpResponse } from 'src/app/shared/models/http-response/http-response.model';
import { SessionModel } from 'src/app/shared/models/session/session.model';
import { CryptoService } from 'src/app/shared/services/crypt/crypto.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    user_email: new FormControl('', [Validators.required, Validators.email]),
    user_senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private _httpService: HttpService,
    private _crypto: CryptoService,
    private _toastService: ToastService,
    private _storageService: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {}

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const { value } = this.loginForm;
    const chunk = this._crypto.encode(JSON.stringify(value));
    
    this._httpService.post<HttpResponse<SessionModel>>(API_URLS.Login, {
      chunk
    }).then(data => {
      if (data.success == true) {
        this._storageService.set(data.data);
        this._router.navigate(['/sys/home']);
      }else{
        this._toastService.show(data.errorMessage!, 'danger');
      }
    }, e => {
      this._toastService.show('', 'danger');
    });
  }

}
