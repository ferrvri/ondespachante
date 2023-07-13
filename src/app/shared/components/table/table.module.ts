import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbCarouselModule, NgbDropdownModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { TableComponent } from "./table.component";
import { IonicModule } from "@ionic/angular";
import { TableItemOptionsAppComponent } from "./components/table-item-options-app/table-item-options-app.component";

@NgModule({
    declarations: [TableComponent, TableItemOptionsAppComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbCarouselModule,
        NgbPaginationModule,
        NgbDropdownModule
    ],
    exports: [TableComponent]
})
export class TablePageModule { }