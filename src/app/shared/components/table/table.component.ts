import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSource } from './extensions/data-source.interface';
import { TableAction } from './extensions/table-action.interface';
import { FilterOption } from './extensions/filter.option.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Platform, PopoverController } from '@ionic/angular';
import { TableItemOptionsAppComponent } from './components/table-item-options-app/table-item-options-app.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {

  filterFormGroup: FormGroup = new FormGroup({
    filterTerm: new FormControl('', Validators.required),
    filterKey: new FormControl('', Validators.required),
  });

  _page: number = 1;

  @Input() showIncludeButton: boolean = false;
  @Input() actions: TableAction[] = [];
  @Input() filters: FilterOption[] = [];

  @Output() filtered: EventEmitter<{ filterTerm: string, filterKey: string }> = new EventEmitter();

  @Input() set page(value: number) {
    this._page = value;
    this.pageChange.emit(value);
  }

  get page() {
    return this._page;
  }

  @Input() pageSize: number = 10;
  @Input() size: number = 100;

  dataSourceOriginal: DataSource<any> = {
    data: []
  };
  @Input() dataSource: DataSource<any> = {
    data: []
  };

  @Input() title: string = '';

  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() onIncludeButtonClicked: EventEmitter<number> = new EventEmitter();

  isFiltered: boolean = false;

  isApp: boolean = false;


  constructor(
    private _platform: Platform,
    private popOverController: PopoverController
  ) {
    this.isApp = _platform.is('mobile');
  }

  ngOnInit(): void {
    this.dataSourceOriginal.data = this.dataSource.data;
  }

  onFilterTermChange() {
    this.isFiltered = true;
    this.filtered.emit(this.filterFormGroup.value);

    // const formValue = this.filterFormGroup.value;

    // if (formValue.filterTerm.length < 1) {
    //   this.clearFilter();
    // } else {
    //   this.dataSource.data = this.dataSourceOriginal.data;
    //   this.dataSource.data = this.dataSource.data.filter(e => {
    //     return e[formValue.filterKey].toLowerCase().indexOf(formValue.filterTerm.toLowerCase()) != -1
    //   });
    // }
  }

  async openPopover(event: any, item: any) {
    const popover =  await this.popOverController.create({
      component: TableItemOptionsAppComponent,
      componentProps: {
        actions: this.actions,
        item
      },
      event
    });

    popover.present();
  }

  
  clearFilter() {
    this.isFiltered = false;
    this.filtered.emit({
      filterKey: '',
      filterTerm: ''
    });
  }
}
