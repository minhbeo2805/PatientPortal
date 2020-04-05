import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import * as moment from 'moment';
// @ts-ignore
import {API_STATUS, GENDER_TEXT} from '../../common/constants';
import {ModalController} from '@ionic/angular';
import {ImageComponent} from '../../components/image/image.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.page.html',
    styleUrls: ['./overview.page.scss'],
})
export class OverviewPage {
    patientData: any;
    seriesUid: any;
    studyUid: any;
    displayData: any;
    tableData: any;

    constructor(private patientService: PatientService,
                public modalController: ModalController,
                private router: Router) {
    }

    async ionViewWillEnter() {
        try {
            const apiResult = await this.patientService.getPatientData();
            console.log(apiResult);
            if (apiResult.success) {
                this.patientData = apiResult.message;
                this.studyUid = this.getStudyUid(this.patientData);
                this.displayData = this.getDisplayData(this.patientData);
                this.displayData.displayBirthday = this.displayData.PATIENT_BIRTH_DTTM ?
                    moment(this.displayData.PATIENT_BIRTH_DTTM).format('YYYY-MM-DD') : '';
                this.displayData.displayGender = this.displayData.PATIENT_SEX ?
                    GENDER_TEXT[this.displayData.PATIENT_SEX] : GENDER_TEXT.Unknown;
            }
        } catch (e) {
            if (e.status === API_STATUS.Unauthorized) {
                localStorage.removeItem('token');
                this.transitToLogin();
            } else {
                console.log(e);
            }
        }
    }

    getStudyUid(patientData) {
        return patientData[0].STUDY_ID;
    }

    getDisplayData(patientData) {
        return patientData[0];
    }

    async openImage(studyId) {
        const image = await this.modalController.create({
            component: ImageComponent,
            id: 'Image',
            componentProps: {
                studyId,
            }
        });

        await image.present();
    }

    transitToLogin() {
        this.router.navigate(['./login']);
    }
}
