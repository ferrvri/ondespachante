import { Injectable } from "@angular/core";
import { StorageService } from "../storage/storage.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { firstValueFrom, fromEvent } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private _httpClient: HttpClient,
        private _storageService: StorageService
    ) { }

    get<T>(url: string, url_params?: any, query_params?: any): Promise<T> {
        const httpheaders = this.buildHeaders()

        return new Promise((resolve, reject) => {
            if (url_params) {
                Object.keys(url_params).forEach(key => {
                    if (url.includes(`:${key}`)) {
                        url = url.replace(`:${key}`, url_params[key]);
                    }
                });
            }

            let httpparams = new HttpParams();

            if (query_params) {
                Object.keys(query_params).forEach(key => {
                    httpparams = httpparams.set(key, query_params[key]);
                });
            }

            firstValueFrom(this._httpClient.get<T>(environment.apiURL + url, {
                headers: httpheaders,
                params: httpparams
            })).then(data => resolve(data), e => reject(e));
        });
    }

    post<T>(url: string, data: any, url_params?: any): Promise<T> {
        const httpheaders = this.buildHeaders()

        return new Promise((resolve, reject) => {
            if (url_params) {
                Object.keys(url_params).forEach(key => {
                    if (url.includes(`:${key}`)) {
                        url = url.replace(`:${key}`, url_params[key]);
                    }
                });
            }

            firstValueFrom(this._httpClient.post<T>(environment.apiURL + url, data, {
                headers: httpheaders
            })).then(data => resolve(data), e => reject(e));
        });
    }

    put<T>(url: string, url_params?: any, params?: any): Promise<T> {
        const httpheaders = this.buildHeaders()

        return new Promise((resolve, reject) => {
            if (url_params) {
                Object.keys(url_params).forEach(key => {
                    if (url.includes(`:${key}`)) {
                        url = url.replace(`:${key}`, url_params[key]);
                    }
                });
            }

            let httpparams = new HttpParams();

            if (params) {
                Object.keys(params).forEach(key => {
                    httpparams = httpparams.set(key, params[key]);
                });
            }

            firstValueFrom(this._httpClient.put<T>(environment.apiURL + url, {
                headers: httpheaders,
                params: httpparams
            })).then(data => resolve(data), e => reject(e));
        });
    }

    delete<T>(url: string, url_params?: any, params?: any): Promise<T> {
        const httpheaders = this.buildHeaders()

        return new Promise((resolve, reject) => {
            if (url_params) {
                Object.keys(url_params).forEach(key => {
                    if (url.includes(`:${key}`)) {
                        url = url.replace(`:${key}`, url_params[key]);
                    }
                });
            }

            let httpparams = new HttpParams();

            if (params) {
                Object.keys(params).forEach(key => {
                    httpparams = httpparams.set(key, params[key]);
                });
            }

            firstValueFrom(this._httpClient.delete<T>(environment.apiURL + url, {
                headers: httpheaders,
                params: httpparams
            })).then(data => resolve(data), e => reject(e));
        });
    }

    private buildHeaders() {
        const user = this._storageService.get();
        let httpHeaders: HttpHeaders = new HttpHeaders();

        if (user && user.token) {
            httpHeaders = httpHeaders.set('x-access-token', user.token);
        }

        return httpHeaders;
    }
}