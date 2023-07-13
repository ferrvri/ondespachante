import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { StorageService } from "../storage/storage.service";

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    $io: Socket = io();

    constructor(
        private _storageService: StorageService
    ) {}

    initialize() {
        const session = this._storageService.get();

        if (session && session.user && session.token) {
            const token = session.token;

            this.$io = io({
                query: {
                    token
                }
            });
        }else{
            console.error('Not logged in.');
        }
    }

    sendToServer(eventName: string, data: any) {
        return new Promise((resolve, _) => {
            this.$io.on(`response-${eventName}`, (responseData) => {
                resolve(responseData);
            });

            this.$io.emit(eventName, data);
        });
    }

}