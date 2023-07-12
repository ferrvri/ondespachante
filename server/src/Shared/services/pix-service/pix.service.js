const axios = require('axios');

const mockResponsePIX = {
    "pix_create_request": {
        "result": "success",
        "response_message": "transacao criada",
        "transaction_id": "HF97T5SH2ZQNLF6Z",
        "created_date": "2017-07-20 20:46:57",
        "value_cents": "18507",
        "status": "pending",
        "order_id": "32330335",
        "due_date": "2017-07-27",
        "pix_code": {
            "qrcode_base64": "iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6AQAAAACgl2eQAAACxElEQVR4Xu2Xy20kMQxExUTE/LPYUKREpK1XMjDyHIw9uLmXEXr6o34GCmSRbLf98/rT3nfe1gc46wOc9QHO+jdgtBace66uX+OYZ7MMmDpGjxWrx+g95ooRbFYCejzyhLTwo8/FgB54SbgIVM//ACByzqUMrfgKXS2gY67UGx3KVu4R3iwE8Od8X++ufn//ywBLPlWgpEuXlUNCz6oCRgsiI6NKWmCcJoSA1QHyhlKl6k3ddkyrl05aHTCwScqkAyJ1Hr3RSCoBapUMhdU1WUVPaqaFgFQSn1ATc6CkT0I3TaUMkKK0V4/S49h5LmWAZ0ly7RQsCVNrfwWqABiERmeblUZGL2W4VgLkiDFC9SplDBaaSSUgBH0SZ5lOWd7JKgA00SSPiSZ5pElla7IQ2HgGTaoaakaSVcB38T4PqGi0R9OQVuQh+S7eCsA9Q4UyCY+6iXKG0iwEhChPtLHNfEMjN/uK5OPA9ERxdPxmuILH5agCYFK0vKObJ43VeCXgoMin1jaN0NRexVsAbL7sGtP0JIuy/ZasAkA3cilxUYBWYBc5dl3Jeh6gXdDKV8e72tdGuJALgaSFUL30MtdQ51+SrATkDh3JeSpjsqvCtS+RzwNO0UIZ1rFb0sILAT0oOkkjccX4sX1P1tOARG6qN0ElVLfyzZWsAmCxKasGv8VXL+VzB6oASDUNeVba0k7ZOPgu3gKgBy4lSuqei0Ju3EchwHc26ZG04IdA/iwLga8QdWpGucK9tJE7ks8DCo2UuXDtE+wj6CXyeYAOZr94tKmOWridVwIsjOqLhzvlfIksAIYVLQZJEJ/BZCFWhcCkhdExNFw3w+SIzFKAQT6UoX6SJfuge1YDgwZCF0+ShZEbl1pApbtJ0OQbR2g6V3XA5hUN3XtU0tFcCNi01njqlrGmqnElVQE/rQ9w1gc46wOc9QvAX+6y+aZjvEg1AAAAAElFTkSuQmCC",
            "qrcode_image_url": "https://pix.paghiper.com/pixcode/?a5eef1cc3013a9a0063ff657229efde603122f9898b26f7c9e5c7d2cc950fdde990aad6d0693bbc3d61b28a640cc775db1eddc55261462ba514f6a41b7d3268c/39JI4HD3FF7NC27Y/84700950.png",
            "emv": "00020101021226770014BR.GOV.BCB.PIX2555api.itau/pix/qr/v1/ce7f9743-6575-485a-86da-a0f56cf136565204000053039865802BR5925PAGHIPER SERV ONLINE EIRE6009SAO PAULO62070503***630409AD",
            "pix_url": "https://pix.paghiper.com/qrcode/180068c7/HF97T5SH2ZQNLF6Z/30039",
            "bacen_url": "https://pix.bcb.gov.br/qr/MDAwMjAxMDEwMjEyMjY3NzAwMTRCUi5HT1YuQkNCLlBJWDI1NTVhcGkuaXRhdS9waXgvcXIvdjEvY2U3Zjk3NDMtNjU3NS00ODVhLTg2ZGEtYTBmNTZjZjEzNjU2NTIwNDAwMDA1MzAzOTg2NTgwMkJSNTkyNVBBR0hJUEVSIFNFUlYgT05MSU5FIEVJUkU2MDA5U0FPIFBBVUxPNjIwNzA1MDMqKio2MzA0MDlBRA=="
        },
        "http_code": "201"
    }
}

module.exports = class PIXService {
    $mysqlService;

    constructor(
        mysqlService
    ) {
        this.$mysqlService = mysqlService;
        this.getPIXHookRequest();
    }

    hookRequests = [];

    async getPIXHookRequest() {
        const pixHookRequests = await this.$mysqlService.query(`select * from pix_hook_request`);

        if (pixHookRequests.length > 0) {
            this.hookRequests = pixHookRequests;
        } else {
            console.error('PIX Hook request empty');
            return;
        }
    }

    async SavePIXHookAndSet(user_id, pixRequest) {
        await this.$mysqlService.query(`
            INSERT INTO pix_hook_request(pix_hook_request_id, user_id, user_order_id, status)
            values ((select uuid()), ?, ?, 'O')
        `, [user_id, pixRequest.order_id]);

        await this.getPIXHookRequest();
    }

    async requestPIXTest(pixRequest, user_id) {
        await this.SavePIXHookAndSet(user_id, pixRequest);

        return new Promise((resolve, reject) => {
            resolve(mockResponsePIX);
        });
    }

    async requestPIX(pixRequest, user_id) {
        await this.SavePIXHookAndSet(user_id, pixRequest);

        return new Promise((resolve, reject) => {
            axios.post(process.env.PAGGHIPER_APIURL.toString(), pixRequest).then((data) => {
                resolve(data)
            }, (e) => reject(e));
        });
    }

    async removeRequest(user_id, user_order_id) {
        await this.$mysqlService.query(`
            UPDATE pix_hook_request SET status = 'C' where user_id = ? and user_order_id = ?
        `, [user_id, user_order_id]);

        await this.getPIXHookRequest();
    }
}