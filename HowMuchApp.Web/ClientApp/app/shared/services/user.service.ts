﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { UserSignUp } from '../../models/UserSignUp.interface';
import { ConfigService } from './config.service';

import { BaseService } from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';


@Injectable()

export class UserService extends BaseService {

    baseUrl: string = '';

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    private loggedIn = false;

    constructor(private http: Http, private configService: ConfigService) {
        super();
       // this.loggedIn = !!localStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
        this.baseUrl = configService.getApiURI();
    }

    register(email: string, password: string, confirmPassword: string): Observable<UserSignUp> {
        let body = JSON.stringify({ email, password, confirmPassword});
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + "/accounts/Register", body, options)
            .map(res => true)
            .catch(this.handleError);
    }

    login(email: string, password: string) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(
            this.baseUrl + '/accounts/Login',
            JSON.stringify({ email, password }), { headers }
            )
            .map(res => res.json())
            .map(res => {
                //localStorage.setItem('auth_token', res.auth_token);
                this.loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            })
            .catch(this.handleError);
    }


    logout() {
        //localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }

}

