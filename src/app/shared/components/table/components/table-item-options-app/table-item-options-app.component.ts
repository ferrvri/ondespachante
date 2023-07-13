import { Component, OnInit } from '@angular/core';
import { TableAction } from '../../extensions/table-action.interface';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-table-item-options-app',
  templateUrl: './table-item-options-app.component.html',
  styleUrls: ['./table-item-options-app.component.scss'],
})
export class TableItemOptionsAppComponent implements OnInit {

  item: any;
  actions: TableAction[] = [];

  constructor(
    private popOverController: PopoverController
  ) { }

  ngOnInit() {}

  async wrapAppFunc(func: Function, item: any) {
    const actualPopover = await this.popOverController.getTop();

    if (actualPopover) {
      actualPopover.dismiss();
      this.popOverController.dismiss();
    }

    func(item);
  }


}
