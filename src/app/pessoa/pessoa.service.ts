import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

import { PessoaFiltro } from '../model/filtro';
import { Pessoa } from '../model/pessoa';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  url: string;

  constructor(private http: Http) { 
    this.url = `${environment.url}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.pessoasPorPagina.toString());

    if(filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if(filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }

    return this.http.get(this.url, {search: params})
    .toPromise()
    .then(response => {
      const json = response.json();
      const pessoas = json.content;

      const resultado = {
        pessoas,
        qtdRegistros: json.totalElements
      };

      return resultado;
    });
  }

  deletar(id: number): Promise<void> {
    return this.http.delete(`${this.url}/${id}`)
      .toPromise()
      .then(() => null);
  }

  salvar(pessoa: Pessoa): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => null);
  }

  getPorId(id: number): Promise<Pessoa> {
    return this.http.get(`${this.url}/${id}`)
      .toPromise()
      .then(response => {
        return response.json() as Pessoa;
      });
  }

  atualizar(pessoa: Pessoa): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${pessoa.id}`, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => null);
  }
}
