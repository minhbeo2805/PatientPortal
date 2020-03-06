import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {OverviewPage} from './overview.page';
import {RouterModule, Routes} from '@angular/router';
import {ImageComponent} from '../../components/image/image.component';
import {ReportComponent} from '../../components/report/report.component';

const routes: Routes = [
    {
        path: '',
        component: OverviewPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [OverviewPage, ImageComponent, ReportComponent],
    entryComponents: [
        ImageComponent,
        ReportComponent
    ]
})
export class OverviewPageModule {
}
