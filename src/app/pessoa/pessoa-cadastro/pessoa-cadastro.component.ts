import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Telefone } from '../../model/telefone';
import { Pessoa } from '../../model/pessoa';
import { PessoaService } from '../pessoa.service';

import { MessageService } from 'primeng/components/common/api';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { }

  ngOnInit() {

    const idPessoa = this.route.snapshot.params['id'];

    if(idPessoa) {
      this.getPorId(idPessoa);
    }

    this.telefone = new Telefone();
    this.pessoa = new Pessoa();
  }

  getPorId(id: number) {
    this.pessoaService.getPorId(id)
    .then(pessoa => {
      this.pessoa = pessoa;
    });
  }

  adicionarTelefone() {
    console.log("Chamou");
    this.pessoa.telefones.push(this.telefone);

    this.telefone = new Telefone();
  }

  salvar(form: FormControl) {
    if(this.editando) {
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
      });
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso.' });
      });
  }

  deletarTelefone(posicao: number) {
    this.pessoa.telefones.splice(posicao, 1);
  }

  get editando() {
    return this.pessoa.id != null;
  }
}
