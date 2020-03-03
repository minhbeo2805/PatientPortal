import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    static LOGIN_URL = '';
    static PATIENT_DATA_URL = 'me';
    static IMAGE_DATA_URL = 'getImage';

    constructor(private apiService: ApiService) {
    }

    login(param) {
        const pathUrl = environment.server_api.concat(PatientService.LOGIN_URL, param.id, '/auth?dob=', param.birthday);
        return this.apiService.getApi(pathUrl);
    }

    getPatientData() {
        const pathUrl = environment.server_api.concat(PatientService.PATIENT_DATA_URL);
        return this.apiService.getApi(pathUrl);
    }
}
