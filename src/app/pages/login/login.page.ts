import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {PatientService} from '../../services/patient.service';
import {LoadingController} from '@ionic/angular';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    private loginForm: FormGroup;
    private minDate;
    private maxDate;

    constructor(
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private loadingController: LoadingController,
        private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group(
            {
                id: ['', Validators.required],
                birthday: ['', Validators.required]
            }
        );
        this.minDate = moment().year() - 100;
        this.maxDate = moment().year();
    }

    async submit() {
        const loading = await this.loadingController.create({
            spinner: 'circles'
        });
        await loading.present();
        this.patientService.login({
            id: this.loginForm.value.id,
            birthday: moment(this.loginForm.value.birthday).format('MM-DD')
        }).then(async data => {
                const token = data.data;
                localStorage.setItem('token', token);
                await loading.dismiss();
                await this.router.navigate(['./overview']);
            }
        ).catch(async error => {
                console.log('Không tìm thấy dữ liệu');
                await loading.dismiss();
            }
        );
    }

}
