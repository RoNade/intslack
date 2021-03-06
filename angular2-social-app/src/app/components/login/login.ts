import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin, AuthenticatedUser } from 'models';
import { AuthenticationService } from '../../services/index';

/**
 * Log a user
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent  {
    model = new UserLogin();
    
    failed = false;

    constructor(
            private authService: AuthenticationService,
            private router : Router
    ) { }

    async login() {
        this.failed = false;

        try {
            // use authService to authenticate and router to redirect
            const authenticatedUser : AuthenticatedUser = await this.authService.authenticate(this.model);
            if(authenticatedUser) return this.router.navigate(['/channel']);
        }
        catch(err) {
            this.failed = true;
        }  
    }
}
