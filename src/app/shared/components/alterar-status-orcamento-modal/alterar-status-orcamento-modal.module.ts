import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AlterarStatusOrcamentoModalComponent } from "./alterar-status-orcamento-modal.component";

@NgModule({
    declarations: [AlterarStatusOrcamentoModalComponent],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [AlterarStatusOrcamentoModalComponent]
})
export class AlterarStatusOrcamentoModalModule { }