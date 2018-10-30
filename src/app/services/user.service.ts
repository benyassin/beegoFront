import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { BASE_URL } from '../config/globals';
import { AuthorizationService } from './authorization.service';
import { User } from './user.interface';
@Injectable()

export class UserService {
    constructor (
        private httpClient: HttpClient,
        private Authorization: AuthorizationService
    ) {
    }


    createUser(user: User): Observable<any> {
        // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const postObservable = this.httpClient.post(BASE_URL + '/users', user);

        return postObservable;
    }

    updateUser(payload): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new HttpParams()
        .set('first_name', payload.username)
        .set('last_name', payload.email)
        .set('password', payload.password);
        const user: any  = this.Authorization.getUserDetails();
        const updateObservable = this.httpClient.put(BASE_URL + '/users/' + user.id, body.toString(), {headers} );

        return updateObservable;
    }

    listUsers(): Observable<any> {
        return this.httpClient.get(BASE_URL + '/users/list');
    }
}

