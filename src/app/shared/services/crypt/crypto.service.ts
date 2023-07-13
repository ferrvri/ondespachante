import { Injectable } from "@angular/core";
import * as CryptoJS  from "crypto-js";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class CryptoService {

    constructor() { }

    encode(data: string) {
        return CryptoJS.AES.encrypt(data, environment._key).toString();
    }
}