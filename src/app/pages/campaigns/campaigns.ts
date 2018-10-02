import { Component, OnInit  } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'campaigns',
  templateUrl: './campaigns.html'
})

export class CampaignsPage implements OnInit {
    constructor(private campaignservice: CampaignService, private router: Router) {}
    campaigns: Array<Object>;

    edit(id) {
        this.campaignservice.currentCampaign = id;
        this.router.navigate(['campaign']);

    }
  ngOnInit() {
    this.campaignservice.listCampaigns()
        .subscribe(
            data => {
                console.log(data);
                this.campaigns = data;
            },
            err => {
                console.log(err);
            }
        );
  }
}
