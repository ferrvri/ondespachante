import { Injectable } from '@angular/core';
import { Repository } from '../repository';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { API_URLS } from 'src/app/shared/constants/api.urls.constant';

@Injectable()
export class ClienteRepositoryService extends Repository {

    constructor(
        private _http: HttpService
    ) {
        super();
    }

    override async save<T>(value: any) {
        return this._http.post<T>(API_URLS.Cliente.Save, value);
    }

    override async getById<T>(id: number) {
        return this._http.get<T>(API_URLS.Cliente.GetById, {Id: id});
    }
}