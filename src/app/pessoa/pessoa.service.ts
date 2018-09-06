import { Injectable } from '@angular/core';

import { Http, URLSearchParams } from '@angular/http';
import { PessoaFiltro } from '../model/filtro';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  url = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    if(filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if(filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }

    return this.http.get(this.url, {search: params})
    .toPromise()
    .then(response => response.json().content)
  }
}
