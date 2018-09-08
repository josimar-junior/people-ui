import { Routes } from '@angular/router';
import { PessoaListagemComponent } from './pessoa/pessoa-listagem/pessoa-listagem.component';
import { PessoaCadastroComponent } from './pessoa/pessoa-cadastro/pessoa-cadastro.component';

export const ROUTES: Routes = [
    { path: '', component: PessoaListagemComponent },
    { path: 'pessoas', component: PessoaListagemComponent },
    { path: 'pessoas/:id', component: PessoaCadastroComponent },
    {path: 'cadastro', component: PessoaCadastroComponent}
]