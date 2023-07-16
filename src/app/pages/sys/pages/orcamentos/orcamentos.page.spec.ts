import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { OrcamentosPage } from './orcamentos.page';

describe('OrcamentosPage', () => {
  let component: OrcamentosPage;
  let fixture: ComponentFixture<OrcamentosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrcamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
