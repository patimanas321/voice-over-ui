/// <reference path="../../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../../node_modules/@types/gapi.auth2/index.d.ts" />

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
    selector: 'google-signin',
    templateUrl: './google-signin.component.html',
    styleUrls: ['./google-signin.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSigninComponent {
    constructor(

    ) {

    }

    id: string = 'btnGoogleSignin';

    // Init params
    private clientId: string = AppConfig.settings.auth.google.client_id;

    @Output() googleSignInSuccess: EventEmitter<GoogleSignInSuccess> = new EventEmitter<GoogleSignInSuccess>();

    @Output() googleSignInFailure: EventEmitter<GoogleSignInFailure> = new EventEmitter<GoogleSignInFailure>();

    ngAfterViewInit() {
        this.auth2Init();
        this.renderButton();
    }

    private auth2Init() {
        if (this.clientId == null)
            throw new Error(
                'clientId property is necessary. (<google-signin [clientId]="..."></google-signin>)');

        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: this.clientId,
                fetch_basic_profile: true,
                ux_mode: 'redirect',
                redirect_uri: AppConfig.settings.auth.google.redirect_uri
            });
        });
    }

    private handleFailure() {
        this.googleSignInFailure.next(new GoogleSignInFailure());
    }

    private handleSuccess(googleUser: gapi.auth2.GoogleUser) {
        this.googleSignInSuccess.next(new GoogleSignInSuccess(googleUser));
    }

    private renderButton() {
        gapi.signin2.render(
            this.id, {
                width: 200,
                height: 50,
                longtitle: true,
                theme: 'dark',
                onsuccess: (googleUser: gapi.auth2.GoogleUser) => this.handleSuccess(googleUser),
                onfailure: () => this.handleFailure()
            });
    }
}

export class GoogleSignInSuccess {
    public googleUser: gapi.auth2.GoogleUser;
  
    constructor(googleUser: gapi.auth2.GoogleUser) {
      this.googleUser = googleUser;
    }
  }
  
  export class GoogleSignInFailure {
  }
  
