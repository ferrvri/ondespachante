import { Injectable } from "@angular/core";
import { AlertButton, AlertController, AlertInput, ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        private _alertController: AlertController
    ) { }

    async show(header: string, subHeader: string, message: string, buttons: AlertButton[], inputs?: AlertInput[]) {
        return new Promise(async (resolve, _) => {
            const alert = this._alertController.create({
                animated: true,
                backdropDismiss: false,
                buttons,
                inputs,
                message,
                header,
                subHeader,
                mode: 'ios',
                cssClass: 'custom-alert'
            });

            (await alert).present();

            (await alert).onDidDismiss().then(data => {
                resolve(data);
            }, e => _(e));
        });
    }

}