import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { BASE_URL } from '../config/globals';
import { AuthorizationService } from './authorization.service';
@Injectable()

export class FormService {
    constructor (
        private httpClient: HttpClient,
    ) {
    }


    createForm(payload): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new HttpParams()
        .set('name', payload.name)
        .set('geometry', payload.geometry)
        .set('color', payload.color)
        .set('campaignId', payload.campaignId)
        .set('schema', payload.schema);

        const postObservable = this.httpClient.post(BASE_URL + '/forms', body.toString(), { headers });

        return postObservable;
    }

    listForms(id_campaign): Observable<any> {
        const listObservable = this.httpClient.get(BASE_URL + '/forms?campaignId=' + id_campaign);
        return listObservable;
    }

}
