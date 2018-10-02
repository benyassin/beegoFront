import { Component, OnInit, Injectable, EventEmitter  } from '@angular/core';
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { FormService } from '../../services/form.service';
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

    fromModel(date: Date): NgbDateStruct {
      return (date && date.getFullYear) ? {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()} : null;
    }
  
    toModel(date: NgbDateStruct): Date {
      return date ? new Date(date.year, date.month - 1, date.day) : null;
    }
  }


@Component({
  selector: 'campaign',
  templateUrl: './campaign.html',
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})


export class CampaignPage implements OnInit {
    constructor(
      private campaignservice: CampaignService,
      private formservice: FormService
    ) {}
    campaignId = null;
    campaign: any = {
        name: null,
        from: null,
        to: null,
        snap: false,
        tolerance_snap: null,
        overlap: false,
        tolerance_overlap: null,
    };
    formulaire: any = {
        name: null,
        geometry: null,
        schema: null
    };
    step = 1;
    geometries = [
      {title: 'Polygone', value: 'polygone'},
      {title: 'Polyline', value: 'polyline'},
      {title: 'Point', value: 'point'}
    ];
    wizard: any = [
        {title: 'Campaign', description: 'Lorem ipsum dolor sit amet', number: 1},
        {title: 'Forms', description: 'Lorem ipsum dolor sit amet', number: 2},
        {title: 'Area & Zones', description: 'Lorem ipsum dolor sit amet', number: 3},
        {title: 'Affectation', description: 'Lorem ipsum dolor sit amet', number: 4}];
  
  public form: any = {
    components: []
  };
  refreshForm;
  render: any = {title: 'test', components: []};
  forms = [];
  get today() {
    return new Date();
  }
  formSubmit(f: NgForm) {
    console.log(f.value);
    switch (this.step) {
        case 1 :
        this.campaignservice.createCampaign(this.campaign)
        .subscribe(
            data => {
                // this.router.navigate(['home']);
                this.campaignId = data.id;
                console.log(data);
            },
            err => {
                console.log(err);
            });
        break;
        case 2 :
        console.log(this.formulaire);
        console.log(this.form);
        const payload = {...this.formulaire, schema: this.form, campaignId: this.campaignId };
        console.log(payload);
        this.formservice.createForm(payload)
            .subscribe(
              data => {
                console.log(data);
              },
              err => {
                console.log(err);
              });
        break;
        default:
        console.log('switch case exception');
    }

  }
  onGeometryChange(value) {
    console.log(value)
    this.formulaire.geometry = value;
}
  onChange(event) {
      console.log(event);
      this.refreshForm.emit({
        form: event.form
      });
    // this.render =  {...event.form.components, components: this.render.components};

  }
  fetchforms(id_campaign) {
    this.formservice.listForms(id_campaign)
    .subscribe(
      data => {
        console.log(data);
        this.forms = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
    if (this.campaignservice.currentCampaign !== null ) {
      this.campaignservice.getCampaign(this.campaignservice.currentCampaign)
      .subscribe(
        data => {
          console.log(data);
          data.from = new Date(data.from);
          data.to = new Date(data.to);
          this.campaign = data;
          this.fetchforms(data.id);
        },
        err => {
          console.log(err);
        }
      );
    }
    this.refreshForm = new EventEmitter();

  }
}
