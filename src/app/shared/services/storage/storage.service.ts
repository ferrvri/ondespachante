import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    set(data: any) {
        localStorage.setItem('session', JSON.stringify(data));
    }

    get() {
        const self = localStorage.getItem('session');
        return JSON.parse(self ? self : '{}');
    }

    dispose() {
        localStorage.removeItem('session');
    }
    
}