import {Component, ElementRef, ViewChild} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import * as moment from 'moment';
// @ts-ignore
import {API_STATUS, GENDER_TEXT, MOCK_RELATED} from '../../common/constants';
import {Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.page.html',
    styleUrls: ['./overview.page.scss'],
})
export class OverviewPage {
    patientData: any;
    studyUid: any;
    displayData: any;
    @ViewChild('sidebarMenu', {static: false}) private sidebarMenu: ElementRef;

    constructor(private patientService: PatientService,
                private router: Router,
                private sharedService: SharedService) {
    }

    async ionViewWillEnter() {
        try {
            // const apiResult = await this.patientService.getPatientData();
            const apiResult = MOCK_RELATED;
            console.log(apiResult);
            if (apiResult.success) {
                this.patientData = apiResult.message;
                this.studyUid = this.getStudyUid(this.patientData);
                this.displayData = this.getDisplayData(this.patientData);
                this.displayData.displayName = this.toUpper(this.displayData.PATIENT_NAME);
                this.displayData.displayBirthday = this.displayData.PATIENT_DOB ?
                    moment(this.displayData.PATIENT_BIRTH_DTTM).format('YYYY/MM/DD') : '';
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
        this.sharedService.studyId = studyId;
        await this.router.navigate(['./images']);
    }

    async transitToLogin() {
        await this.router.navigate(['./login']);
    }

    openMenu() {
        this.sidebarMenu.nativeElement.className = 'sidebar-wrap opened';
    }

    closeMenu() {
        this.sidebarMenu.nativeElement.className = 'sidebar-wrap';
    }

    toUpper(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => {
                console.log('First capital letter: ' + word[0]);
                console.log('remain letters: ' + word.substr(1));
                return word[0].toUpperCase() + word.substr(1);
            })
            .join(' ');
    }

}
