import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/components/panel/panel';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/components/growl/growl';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { PessoaListagemComponent } from './pessoa-listagem/pessoa-listagem.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PanelModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    GrowlModule,
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [
    PessoaListagemComponent,
    PessoaCadastroComponent
  ],
  exports: [
    PessoaListagemComponent,
    PessoaCadastroComponent],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PessoaModule { }
