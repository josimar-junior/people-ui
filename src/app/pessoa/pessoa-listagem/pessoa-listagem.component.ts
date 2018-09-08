import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../../model/pessoa';
import { PessoaFiltro } from '../../model/filtro';

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
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.pessoas = resultado.pessoas;
        this.qtdRegistros = resultado.qtdRegistros;
      });
  }

  mudarPagina(event: LazyLoadEvent) {
    const paginaAtual = event.first / event.rows;
    this.pesquisar(paginaAtual);
  }

  confirmarDeletar(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente deletar esta pessoa?',
      accept: () => {
        this.deletar(id);
      }
    });
  }

  deletar(id: number) {
    this.pessoaService.deletar(id)
      .then(() => {
        if (this.tabela.first === 0) {
          this.pesquisar();
        } else {
          this.tabela.first = 0;
        }

        this.messageService.add({ severity: 'success', detail: 'Pessoa removida com sucesso.' });
      });
  }
}
