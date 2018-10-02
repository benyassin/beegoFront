// Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title }    from '@angular/platform-browser';
import { AppRoutingModule }        from './app-routing.module';
import { NgbModule }               from '@ng-bootstrap/ng-bootstrap';
import { NgModule }                from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, MatTableModule }    from '@angular/material';
import * as global from './config/globals';

// Main Component
import { AppComponent }          from './app.component';
import { HeaderComponent }       from './components/header/header.component';
import { SidebarComponent }      from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }      from './components/top-menu/top-menu.component';
import { FooterComponent }       from './components/footer/footer.component';
import { PanelComponent }        from './components/panel/panel.component';

// Component Module
import { NvD3Module }           from 'ng2-nvd3';
import { AgmCoreModule }        from '@agm/core';
import { CalendarModule }       from 'angular-calendar';
import { FullCalendarModule }   from 'ng-fullcalendar';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgxChartsModule }      from '@swimlane/ngx-charts';
import { NgxDatatableModule }   from '@swimlane/ngx-datatable';
import { TrendModule }          from 'ngx-trend';
import { HighlightJsModule }    from 'ngx-highlight-js';
import { CountdownModule }      from 'ngx-countdown';
import { ChartsModule }         from 'ng4-charts/ng4-charts';
import { TagsInputModule }      from 'ngx-tags-input/dist';
import { Ng2TableModule }       from 'ngx-datatable/ng2-table';
import { FormioModule } from 'angular-formio';

// Pages
import { HomePage }          from './pages/home/home';
import { LoginPage } from './pages/login/login';
import { SignUpComponent } from './pages/signup/signup';
import { WizardComponent } from './pages/signup/wizard';
import { CampaignPage } from './pages/campaign/campaign';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JWT_OPTIONS, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { RefreshTokenInterceptor } from './interceptors/refresh-token-interceptor';
import { AuthorizationService } from './services/authorization.service';
import { UserService } from './services/user.service';
import { CampaignService } from './services/campaign.service';
import { FormService } from './services/form.service';
import { CampaignsPage } from './pages/campaigns/campaigns';

function jwtOptionsFactory (authorizationService: AuthorizationService) {
  return {
    tokenGetter: () => {
      return authorizationService.getAccessToken();
    },
    blacklistedRoutes: [`http://localhost:8000/login-check`]
  };
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    LoginPage,
    HomePage,
    SignUpComponent,
    WizardComponent,
    CampaignPage,
    CampaignsPage
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk' }),
    BrowserAnimationsModule,
    BrowserModule,
    CalendarModule.forRoot(),
    CountdownModule,
    ChartsModule,
    FullCalendarModule,
    FormsModule,
    HighlightJsModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    NvD3Module,
    ReactiveFormsModule,
    SlimLoadingBarModule.forRoot(),
    TrendModule,
    TagsInputModule.forRoot(),
    NgxDatatableModule,
    MatSortModule,
    MatTableModule,
    FormioModule,
    Ng2TableModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    })
  ],
  providers: [
    Title,
    AuthorizationService,
    UserService,
    CampaignService,
    FormService,
    JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
   ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const title = 'Color Admin | ' + this.route.snapshot.firstChild.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
