import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrcamentosPageRoutingModule } from './orcamentos-routing.module';

import { OrcamentosPage } from './orcamentos.page';
import { TablePageModule } from 'src/app/shared/components/table/table.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrcamentosPageRoutingModule,
    TablePageModule
  ],
  declarations: [OrcamentosPage]
})
export class OrcamentosPageModule {}
