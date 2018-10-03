import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { BASE_URL } from '../config/globals';
import { AuthorizationService } from './authorization.service';
import { Form } from './form.interface';
@Injectable()

export class FormService {
    constructor (
        private httpClient: HttpClient,
    ) {
    }


    createForm(form: Form): Observable<any> {
        // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        // const body = new HttpParams()
        // .set('name', payload.name)
        // .set('geometry', payload.geometry)
        // .set('color', payload.color)
        // .set('campaignId', payload.campaignId)
        // .set('schema', payload.schema);

        const postObservable = this.httpClient.post(BASE_URL + '/forms', form);

        return postObservable;
    }

    listForms(id_campaign): Observable<any> {
        const listObservable = this.httpClient.get(BASE_URL + '/forms?campaignId=' + id_campaign);
        return listObservable;
    }
    updateForm(form: Form): Observable<any> {
        // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        // const body = new HttpParams()
        // .set('id', payload.id)
        // .set('name', payload.name)
        // .set('geometry', payload.geometry)
        // .set('color', payload.color)
        // .set('campaignId', payload.campaignId)
        // .set('schema', JSON.stringify(payload.schema));
        console.log(form);
        const updateObservable = this.httpClient.put(BASE_URL + '/forms/', form);
        return updateObservable;
    }

    deleteForm(id): Observable<any> {
        return this.httpClient.delete(BASE_URL + '/forms/' + id);
    }

    toggleForm(id, state): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new HttpParams()
        .set('activate', state);
        return this.httpClient.put(BASE_URL + '/forms/' + id + '/toggle', body, { headers });
    }

}
