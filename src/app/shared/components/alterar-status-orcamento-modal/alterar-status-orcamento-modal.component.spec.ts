import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarStatusOrcamentoModalComponent } from './alterar-status-orcamento-modal.component';

describe('AlterarStatusOrcamentoModalComponent', () => {
  let component: AlterarStatusOrcamentoModalComponent;
  let fixture: ComponentFixture<AlterarStatusOrcamentoModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarStatusOrcamentoModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarStatusOrcamentoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
