import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { navAnimation } from './shared/animations/nav.animation';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlterarStatusOrcamentoModalModule } from './shared/components/alterar-status-orcamento-modal/alterar-status-orcamento-modal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      animated: true,
      navAnimation: navAnimation,
      mode: 'ios'
    }),
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AlterarStatusOrcamentoModalModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
