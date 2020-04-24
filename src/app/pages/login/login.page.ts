import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {PatientService} from '../../services/patient.service';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {MESSAGES} from '../../common/constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    public loginForm: FormGroup;
    public minDate;
    public maxDate;
    public isInvalid: boolean;
    public errorMessage: string;

    constructor(
        private formBuilder: FormBuilder,
        private patientService: PatientService,
        private loadingController: LoadingController,
        private alertController: AlertController,
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
        this.isInvalid = false;
        this.errorMessage = '';
    }

    async submit() {
        this.router.navigate(['./overview']);
        // this.resetErrorMessage();
        // const loading = await this.loadingController.create({
        //     spinner: 'circles'
        // });
        // await loading.present();
        // this.patientService.login({
        //     id: this.loginForm.value.id,
        //     birthday: moment(this.loginForm.value.birthday).format('MM-DD-YYYY')
        // }).then(async data => {
        //         if (data.success) {
        //             const token = data.message;
        //             localStorage.removeItem('token');
        //             localStorage.setItem('token', token);
        //             await loading.dismiss();
        //             await this.router.navigate(['./overview']);
        //         } else {
        //             this.isInvalid = true;
        //             this.errorMessage = MESSAGES.AUTHENTICATE_FAIL;
        //             await loading.dismiss();
        //         }
        //     }
        // ).catch(async error => {
        //         this.isInvalid = true;
        //         this.errorMessage = MESSAGES.API_FAIL;
        //         await loading.dismiss();
        //     }
        // );
    }

    resetErrorMessage() {
        this.isInvalid = false;
        this.errorMessage = null;
    }
}
