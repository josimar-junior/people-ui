import { Component, OnInit } from '@angular/core';
import { Telefone } from '../../model/telefone';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  telefone: Telefone;
  telefones: Array<Telefone>;

  constructor() { }

  ngOnInit() {
    this.telefone = new Telefone();
    this.telefones = new Array();
  }

  adicionarTelefone() {
    console.log("Chamou");
    this.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }
}
