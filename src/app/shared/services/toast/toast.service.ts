import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(
        private _toastController: ToastController
    ) { }

    async show(message: string, color: 'primary'
        | 'secondary'
        | 'tertiary'
        | 'success'
        | 'warning'
        | 'danger'
        | 'light'
        | 'medium'
        | 'dark'
        , timeout: number = 2000) {

        return new Promise(async (resolve, _) => {
            const _toast = await this._toastController.create({
                message,
                duration: timeout,
                animated: true,
                position: 'top',
                color
            });

            _toast.present();

            _toast.onDidDismiss().then(_ => {
                resolve({ done: true })
            });
        });
    }

}