import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysPage } from './sys.page';

const routes: Routes = [
  {
    path: '',
    component: SysPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'orcamentos',
        loadChildren: () => import('./pages/orcamentos/orcamentos.module').then(m => m.OrcamentosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysPageRoutingModule {}
