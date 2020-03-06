import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';
import * as moment from 'moment';
// @ts-ignore
import {GENDER_TEXT} from '../../common/constants';
import {ModalController} from '@ionic/angular';
import {ImageComponent} from '../../components/image/image.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.page.html',
    styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
    patientData: any;
    seriesUid: any;
    studyUid: any;
    displayData: any;
    tableData: any;

    constructor(private patientService: PatientService,
                public modalController: ModalController,
                private router: Router) {
    }

    async ngOnInit() {
        try {
            const apiResult = await this.patientService.getPatientData();
            this.patientData = apiResult.data;
            this.seriesUid = this.getSeriesUid(this.patientData);
            this.studyUid = this.getStudyUid(this.patientData);
            this.displayData = this.getDisplayData(this.patientData);
            this.tableData = this.getTableData(this.patientData);
            this.displayData.displayBirthday = this.displayData.patient_birth_dttm ?
                moment(this.displayData.patient_birth_dttm).format('YYYY-MM-DD') : '';
            this.displayData.displayGender = this.displayData.sex ? GENDER_TEXT[this.displayData.sex] : GENDER_TEXT.Unknown;
        } catch (e) {
            console.log(e);
        }
    }

    getStudyUid(patientData) {
        return patientData.studyserieslist[0].uid;
    }

    getSeriesUid(patientData) {
        return patientData.studyserieslist[0].serieslist[0].uid;
    }

    getDisplayData(patientData) {
        return patientData.studylist[0];
    }

    getTableData(patientData) {
        return patientData.studylist;
    }

    async openImage() {
        const image = await this.modalController.create({
            component: ImageComponent,
            id: 'Image',
            cssClass: 'modal-fullscreen'
        });

        await image.present();
    }

    transitToLogin() {
        this.router.navigate(['./login']);
    }
}
