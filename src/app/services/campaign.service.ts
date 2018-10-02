import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { BASE_URL } from '../config/globals';
import { AuthorizationService } from './authorization.service';
@Injectable()

export class CampaignService {
    constructor (
        private httpClient: HttpClient,
    ) {
    }
    currentCampaign = null;

    createCampaign(payload): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        payload.overlap = 1;
        const body = new HttpParams()
        .set('name', payload.name)
        .set('from', payload.from.toJSON())
        .set('to', payload.to.toJSON())
        .set('snap', payload.snap)
        .set('tolerance_snap', payload.tolerance_snap)
        .set('overlap', payload.overlap)
        .set('tolerance_overlap', payload.tolerance_overlap);
        const postObservable = this.httpClient.post(BASE_URL + '/campaigns', body.toString(), { headers });

        return postObservable;
    }

    listCampaigns(): Observable<any> {

        const getObeservable = this.httpClient.get(BASE_URL + '/campaigns');
        return getObeservable;
    }

    getCampaign(id): Observable<any> {
        const getObeservable = this.httpClient.get(BASE_URL + '/campaigns/' + id);
        return getObeservable;
    }

}
