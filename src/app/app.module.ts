import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PessoaModule } from './pessoa/pessoa.module';
import { PessoaService } from './pessoa/pessoa.service';

import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    PessoaModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PessoaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
