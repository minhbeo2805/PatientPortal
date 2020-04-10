import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    static LOGIN_URL = 'entry/';
    static PATIENT_DATA_URL = 'api/me/related';
    static STUDY_IMAGE_URL = 'api/me/view';

    constructor(private apiService: ApiService) {
    }

    login(param) {
        const pathUrl = environment.server_api.concat(PatientService.LOGIN_URL, param.id, '/', param.birthday);
        return this.apiService.getApi(pathUrl);
    }

    getPatientData(): Promise<any> {
        const pathUrl = environment.server_api.concat(PatientService.PATIENT_DATA_URL);
        return this.apiService.getApi(pathUrl);
    }

    getStudyImages(studyId) {
        const pathUrl = environment.server_api.concat(PatientService.STUDY_IMAGE_URL, '/', studyId);
        return this.apiService.getApi(pathUrl);
    }
}
