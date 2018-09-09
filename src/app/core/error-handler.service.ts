import { Injectable } from '@angular/core';

import { Response } from '@angular/http';

import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(response: any) {
    let mensagem: string;

    if (typeof response === 'string') {
      mensagem = response;
    } else if (response instanceof Response) {

      try {
        let erros = response.json();

        mensagem = erros.title;
      } catch (e) {
        mensagem = 'Erro response';
      }

      console.error('Ocorreu um erro', mensagem);

    } else {
      mensagem = "Erro ao processar requisição.";
      console.log('Erro', response);
    }

    this.messageService.add({ severity: 'error', detail: mensagem });
  }
}
