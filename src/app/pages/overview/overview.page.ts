import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../services/patient.service';

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

    constructor(private patientService: PatientService) {
    }

    async ngOnInit() {
        try {
            const apiResult = await this.patientService.getPatientData();
            this.patientData = apiResult.data;
            this.seriesUid = this.getSeriesUid(this.patientData);
            this.studyUid = this.getStudyUid(this.patientData);
            this.displayData = this.getDisplayData(this.patientData);
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
        return patientData.studylist;
    }

}
