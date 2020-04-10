import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {ImagesPage} from './images.page';
import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from '../../components/report/report.component';

const routes: Routes = [
    {
        path: '',
        component: ImagesPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [ImagesPage, ReportComponent],
    entryComponents: [
        ReportComponent
    ]
})
export class ImagesPageModule {
}
