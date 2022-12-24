import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ListComponent } from './list.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemHeroService } from './in-memory.service';

@NgModule({
  imports:      [ BrowserModule.withServerTransition({ appId: 'my-app' }), FormsModule, HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(InMemHeroService), BrowserTransferStateModule ],
  declarations: [ AppComponent, HelloComponent, ListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
