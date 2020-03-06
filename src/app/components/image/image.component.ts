import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ReportComponent} from '../report/report.component';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

    constructor(public modalController: ModalController) {
    }

    ngOnInit() {
    }

    async openReport() {
        const report = await this.modalController.create({
            component: ReportComponent,
            id: 'Report',
            cssClass: 'modal-fullscreen'
        });
        await report.present();
    }

    async closeModal() {
        await this.modalController.dismiss(null, null, 'Image');
    }
}
