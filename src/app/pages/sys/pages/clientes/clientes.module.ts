import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientesPageRoutingModule } from './clientes-routing.module';

import { ClientesPage } from './clientes.page';
import { TablePageModule } from 'src/app/shared/components/table/table.module';
import { CadastroClienteComponent } from './pages/cadastro-cliente/cadastro-cliente.component';
import { EditPageModule } from 'src/app/shared/components/edit-page/edit-page.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientesPageRoutingModule,
    TablePageModule,
    EditPageModule
  ],
  declarations: [ClientesPage, CadastroClienteComponent]
})
export class ClientesPageModule {}
