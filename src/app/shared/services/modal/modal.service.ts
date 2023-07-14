import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    constructor(
        private _modalController: ModalController
    ) { }

    async show<T>(component: any, componentProps: any, cssClass?: string): Promise<T>{
        return new Promise(async (resolve, _) => {
            const modal = await this._modalController.create({
                animated: true,
                component,
                backdropDismiss: true,
                mode: 'ios',
                showBackdrop: true,
                componentProps,
                cssClass
            });

            modal.present();

            modal.onDidDismiss().then(data => {
                resolve(data.data);
            });
        });
    }
}