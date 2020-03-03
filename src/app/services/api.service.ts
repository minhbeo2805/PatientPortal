import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {timeout} from 'rxjs/operators';
// @ts-ignore
import {API_TIMEOUT} from '../common/constants';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private readonly http: HttpClient) {
        this.header = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
    }

    private header: HttpHeaders;

    getApi(pathUrl): Promise<any> {
        return new Promise((resolve, reject) => {
            const options = {
                headers: this.getHeader()
            };
            this.http.get(pathUrl, options)
                .pipe(timeout(API_TIMEOUT))
                .subscribe(async data => {
                    resolve(data);
                }, async error => {
                    reject(error);
                })
            ;
        });
    }

    private getHeader() {
        const token = localStorage.getItem('token');
        if (token) {
            this.header = this.header.set('Authorization', 'Bearer '.concat(token));
        }

        return this.header;
    }
}
