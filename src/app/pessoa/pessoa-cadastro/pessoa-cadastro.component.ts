import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Telefone } from '../../model/telefone';
import { Pessoa } from '../../model/pessoa';
import { PessoaService } from '../pessoa.service';

import { MessageService } from 'primeng/components/common/api';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  telefone: Telefone;
  pessoa: Pessoa;

  constructor(private pessoaService: PessoaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit() {

    const idPessoa = this.route.snapshot.params['id'];

    if (idPessoa) {
      this.getPorId(idPessoa);
    }

    this.telefone = new Telefone();
    this.pessoa = new Pessoa();
  }

  getPorId(id: number) {
    this.pessoaService.getPorId(id)
      .then(pessoa => {
        this.pessoa = pessoa;
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  adicionarTelefone() {
    this.pessoa.telefones.push(this.telefone);

    this.telefone = new Telefone();
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.salvarPessoa(form);
    }
  }

  salvarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa salva com sucesso.' });

        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso.' });
      })
      .catch(erro => this.errorHandlerService.handle(erro));
  }

  deletarTelefone(posicao: number) {
    this.pessoa.telefones.splice(posicao, 1);
  }

  get editando() {
    return this.pessoa.id != null;
  }

  get camposInvalidos() {
    return this.pessoa.dataNascimento == undefined || this.pessoa.dataNascimento.toString().includes('_')
    || this.pessoa.cpf == undefined || this.pessoa.cpf.includes('_');
  }

  get telefoneInvalido() {
    return this.telefone.ddd == undefined || this.telefone.ddd.includes('_')
      || this.telefone.numero == undefined || this.telefone.numero.includes('_');
  }
}
