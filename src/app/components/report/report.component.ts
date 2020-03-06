import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {


  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss(null, null, 'Report');
  }
}
