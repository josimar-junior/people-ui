import { Component, OnInit } from '@angular/core';
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

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.pessoaService.pesquisar(this.filtro).then(pessoas => this.pessoas = pessoas);
  }
}
