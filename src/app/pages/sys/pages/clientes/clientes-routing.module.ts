import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPage } from './clientes.page';
import { CadastroClienteComponent } from 'src/app/pages/sys/pages/clientes/pages/cadastro-cliente/cadastro-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesPage
  },
  {
    path: 'cadastro',
    component: CadastroClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPageRoutingModule {}
