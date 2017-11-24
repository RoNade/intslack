import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/index';
import { UserRegistration, User } from 'models';
import { NgForm } from '@angular/forms';

/**
 * Registration for new user
 */
@Component({
    selector: 'register',
    templateUrl: 'register.html'
})
export class RegisterComponent {
    @ViewChild(NgForm)
    ngForm: NgForm;

    model = new UserRegistration();
    existingUser = false;

    constructor(
        private registrationService: RegistrationService,
        private router: Router
    ) { }

    async register() {
        if(this.ngForm.form.invalid) {
            return;
        }

        this.existingUser = await this.registrationService.usernameExists(this.model.username);

        if(this.existingUser) {
            return;
        }
        
        // register user with registrationService
        try {
            const registration : User = await this.registrationService.register(this.model);
            this.router.navigate(['/login']);
        }
        catch(err) {
            throw new Error(err);
        }
    }
}
