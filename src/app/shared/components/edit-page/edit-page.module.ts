import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { EditPageComponent } from "./edit-page.component";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@NgModule({
    declarations: [EditPageComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskDirective,
        NgxMaskPipe
    ],
    providers: [provideNgxMask()],
    exports: [EditPageComponent]
})
export class EditPageModule { }