import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';
import { HttpResponse } from 'src/app/shared/models/http-response/http-response.model';
import { MenuItem } from 'src/app/shared/models/menu-item/menu-item.model';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-sys',
  templateUrl: './sys.page.html',
  styleUrls: ['./sys.page.scss'],
})
export class SysPage implements OnInit {

  menu: MenuItem[] = [];

  constructor(
    private _httpService: HttpService,
    private _router: Router,
    private _storageService: StorageService
  ) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this._httpService.get<HttpResponse<MenuItem[]>>(API_URLS.Ui.Menu).then(data => {
      this.menu.push(...data.data);

      this.menu.push({
        title: 'Sair',
        action: () => this.logOut()
      });

    });
  }

  logOut() {
    this._storageService.dispose();
    this._router.navigate(['/']);
  }

  gotoRouter(routerLink: string) {
    this._router.navigate([routerLink]);
  }
}
