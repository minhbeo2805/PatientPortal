import {Component} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {PatientService} from '../../services/patient.service';
import {ReportComponent} from '../../components/report/report.component';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {MOCK_STUDY} from '../../common/constants';

@Component({
    selector: 'app-images',
    templateUrl: './images.page.html',
    styleUrls: ['./images.page.scss'],
})
export class ImagesPage {
    public studyId: number;
    public imagesList: any;
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    constructor(public modalController: ModalController,
                public patientService: PatientService,
                private readonly route: ActivatedRoute,
                private router: Router,
                private sharedService: SharedService) {
    }

    async ionViewWillEnter() {
        this.studyId = this.sharedService.studyId;
        try {
            // const apiResult = await this.patientService.getStudyImages(this.studyId);
            const apiResult = MOCK_STUDY;
            if (apiResult.success) {
                this.imagesList = apiResult.message;
            } else {
                await this.router.navigate(['overview']);
            }
        } catch (e) {
            console.log(e);
            await this.router.navigate(['overview']);
        }
    }

    async openReport() {
        const report = await this.modalController.create({
            component: ReportComponent,
            id: 'Report',
            cssClass: 'modal-report',
            backdropDismiss: false
        });
        await report.present();
    }

    async transitToOverview() {
        await this.router.navigate(['./overview']);
    }


}
