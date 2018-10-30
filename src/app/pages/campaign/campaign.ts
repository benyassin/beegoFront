import { Component, OnInit, Injectable, EventEmitter, AfterViewInit, ViewChild  } from '@angular/core';
import { NgbModal,NgbDateAdapter, NgbDateStruct, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { FormService } from '../../services/form.service';
import * as L from 'leaflet';
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
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  styleUrls: ['./campaign.css'],

})


export class CampaignPage implements OnInit, AfterViewInit {
    constructor(
      private campaignservice: CampaignService,
      private formservice: FormService,
      private modalService: NgbModal
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
    editing = false;
    creating = false;
    options: NgbModalOptions = {
      size: 'lg'
    };
    
    geometries = [
      {title: 'Point', value: '1'},
      {title: 'Polyline', value: '2'},
      {title: 'Polygon', value: '3'},
      {title: 'Sans Géometrie', value: '4'},
      {title: 'Identification', value: '5'}
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
  open(content) {
    console.log(content);
    this.modalService.open(content, this.options).result.then((result) => {
     const map = L.map('mapid').setView([51.505, -0.09], 13);
      map.invalidateSize();
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  formSubmit(f: NgForm) {
    console.log(f.value);
    switch (this.step) {
        case 1 :
        this.createCampaign(this.campaign);
        break;
        case 2 :
        const payload = {...this.formulaire, schema: this.form, campaignId: this.campaignId };

          if (this.editing) {
              this.editForm({...payload, id: this.formulaire.id});
          } else {
              this.createForm(payload);
          }

        break;
        default:
        console.log('switch case exception');
    }

  }
  createCampaign(campaign) {
    this.campaignservice.createCampaign(campaign)
    .subscribe(
        data => {
            // this.router.navigate(['home']);
            this.campaignId = data.id;
            console.log(data);
        },
        err => {
            console.log(err);
        });
  }
  createForm(payload) {
    this.formservice.createForm(payload)
        .subscribe(
          data => {
            console.log(data);
            this.creating = false;
            this.fetchforms(this.campaignId);
          },
          err => {
            console.log(err);
      });
  }
  editForm(payload) {
    console.log(payload);
    this.formservice.updateForm(payload)
      .subscribe(
        data => {
          console.log(data);
          this.editing = false;
          this.fetchforms(this.campaignId);
        },
        err => {
          console.log(err);
        }
      );
  }
  deleteForm(id) {
    this.formservice.deleteForm(id)
      .subscribe(
        data => {
          console.log(data);
          this.fetchforms(this.campaignId);
        },
        err => {
          console.log(err);
        }
      );
  }
  onGeometryChange(value) {
    console.log(value);
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
  edit(form) {
    this.formulaire = {...form};
    this.editing = true;
  }

  toggleForm(id, state) {
    this.formservice.toggleForm(id, state)
      .subscribe(
        data => {
          console.log(data);
          this.fetchforms(this.campaignId);
        },
        err => {
          console.log(err);
        }
      );
  }
  newForm() {
    console.log('[newForm] clicked');
    this.formulaire = {
      name: null,
      geometry: null,
      schema: null
    };
    this.creating = true;
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
          this.campaignId = data.id;
          this.fetchforms(data.id);
        },
        err => {
          console.log(err);
        }
      );
    }

    this.refreshForm = new EventEmitter();
  }
  ngAfterViewInit() {
  }
}
