import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ReportComponent} from '../report/report.component';
import {PatientService} from '../../services/patient.service';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
    @Input() studyId: any;

    constructor(public modalController: ModalController,
                public patientService: PatientService) {
    }

    async ngOnInit() {
        try {
            const apiResult = await this.patientService.getStudyImages(this.studyId);
            console.log(apiResult);
        } catch (e) {
            console.log(e);
        }
    }

    async openReport() {
        const report = await this.modalController.create({
            component: ReportComponent,
            id: 'Report',
            cssClass: 'modal-report'
        });
        await report.present();
    }

    async closeModal() {
        await this.modalController.dismiss(null, null, 'Image');
    }
}
