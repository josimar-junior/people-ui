import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../model/pessoa';
import { PessoaFiltro } from '../../model/filtro';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-listagem',
  templateUrl: './pessoa-listagem.component.html',
  styleUrls: ['./pessoa-listagem.component.css']
})
export class PessoaListagemComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas = Array<Pessoa>();
  qtdRegistros = 0;
  @ViewChild('tabela') tabela;

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.qtdRegistros = resultado.qtdRegistros;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  mudarPagina(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.pesquisar(paginaAtual);
  }

  confirmarDeletar(pessoa: Pessoa) {
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar esta pessoa?',
      accept: () => {
        this.deletar(pessoa);
      }
    });
  }

  deletar(pessoa: Pessoa) {
    console.log(this.tabela.first);
    this.pessoaService.deletar(pessoa.id)
      .then(() => {

        let indice = this.pessoas.indexOf(pessoa);

        this.pessoas.splice(indice, 1);

       if (this.tabela.first !== 0) {
          this.pesquisar();
       }

        this.messageService.add({ severity: 'success', detail: 'Pessoa removida com sucesso.' });
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }
}
